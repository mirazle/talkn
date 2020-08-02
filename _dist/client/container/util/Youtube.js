window.Youtube = (function () {
    "use strict";
    var version_info = [1, 0, 1];
    var bind_function = function (callback, self) {
        var args = Array.prototype.slice.call(arguments, 2);
        return function () {
            var full_args = Array.prototype.slice.call(args);
            Array.prototype.push.apply(full_args, arguments);
            return callback.apply(self, full_args);
        };
    };
    var add_event_listener = function (event_list, node, event, callback, capture) {
        node.addEventListener(event, callback, capture);
        event_list.push([node, event, callback, capture]);
    };
    var remove_event_listeners = function (event_list) {
        for (var i = 0, entry; i < event_list.length; ++i) {
            entry = event_list[i];
            entry[0].removeEventListener(entry[1], entry[2], entry[3]);
        }
    };
    var support_check = function () {
        return window.postMessage ? true : false;
    };
    var Player = (function () {
        var Player = function (settings) {
            var url, k, v;
            this.muted = false;
            this.volume = 100;
            this.player_state = -1;
            this.current_time = 0.0;
            this.duration = 0.0;
            this.video_data = null;
            this.loaded_fraction = 0.0;
            this.playback_quality = "";
            this.playback_qualities_available = [];
            this.playback_rate = 1.0;
            this.playback_rates_available = [];
            this.video_url = "";
            this.playlist = null;
            this.playlist_index = -1;
            this.extended_api = {};
            this.id = next_player_id++;
            this.node_events = [];
            this.events = {};
            this.events_queued = {};
            this.listening_interval = null;
            this.iframe = document.createElement("iframe");
            this.iframe.setAttribute("frameborder", "0");
            this.url_target = ("https" in settings && !settings.https ? "http:" : "https:") + "//www.youtube.com";
            url = this.url_target + "/embed";
            if ("video_id" in settings)
                url += "/" + settings.video_id;
            url += "?enablejsapi=1";
            if ("params" in settings) {
                for (k in settings.params) {
                    v = settings.params[k];
                    url += "&";
                    url += k;
                    if (v !== null) {
                        url += "=";
                        url += settings.params[k];
                    }
                }
            }
            this.iframe.setAttribute("src", url);
            this.iframe.setAttribute("style", "z-index: 1000;position: fixed; top: 0px;");
            add_event_listener(this.node_events, window, "message", bind_function(on_window_message, this), false);
            add_event_listener(this.node_events, this.iframe, "load", bind_function(on_iframe_load, this), false);
            document.querySelector("body").appendChild(this.iframe);
            if ("on" in settings) {
                for (k in settings.on) {
                    this.on(k, settings.on[k]);
                }
            }
        };
        Player.UNSTARTED = -1;
        Player.ENDED = 0;
        Player.PLAYING = 1;
        Player.PAUSED = 2;
        Player.BUFFERING = 3;
        Player.CUED = 5;
        var next_player_id = 0;
        var event_map_native = {
            yt_state_change: "onStateChange",
            yt_playback_quality_change: "onPlaybackQualityChange",
            yt_playback_rate_change: "onPlaybackRateChange",
            yt_api_change: "onApiChange",
            yt_error: "onError"
        };
        var event_map_custom = {
            state_change: ["player_state"],
            volume_change: ["volume", "muted"],
            time_change: ["current_time"],
            duration_change: ["duration"],
            progress: ["loaded_fraction"],
            video_data_change: ["video_data"],
            playback_quality_change: ["playback_quality"],
            playback_rate_change: ["playback_rate"],
            playback_qualities_available_change: ["playback_qualities_available"],
            playback_rates_available_change: ["playback_rates_available"],
            playlist_change: ["playlist"],
            playlist_index_change: ["playlist_index"],
            api_change: ["extended_api"]
        };
        var event_map_native_reversed = (function () {
            var ret = {}, i;
            for (i in event_map_native) {
                ret[event_map_native[i]] = i;
            }
            return ret;
        })();
        var player_vars_events = (function () {
            var ret = {}, event, vars, i;
            for (event in event_map_custom) {
                vars = event_map_custom[event];
                for (i = 0; i < vars.length; ++i) {
                    ret[vars[i]] = event;
                }
            }
            return ret;
        })();
        var player_vars_rename_map = {
            muted: "muted",
            volume: "volume",
            playerState: "player_state",
            currentTime: "current_time",
            duration: "duration",
            videoData: "video_data",
            videoLoadedFraction: "loaded_fraction",
            playbackQuality: "playback_quality",
            availableQualityLevels: "playback_qualities_available",
            playbackRate: "playback_rate",
            availablePlaybackRates: "playback_rates_available",
            videoUrl: "video_url",
            playlist: "playlist",
            playlistIndex: "playlist_index"
        };
        function deep_compare(x, y) {
            var a = typeof x, i;
            if (a == typeof y) {
                if (a == "object") {
                    if (x === null) {
                        return y === null;
                    }
                    else if (y === null) {
                        return false;
                    }
                    else if (Array.isArray(x)) {
                        if (!Array.isArray(y) || x.length != y.length)
                            return false;
                        for (i = 0; i < x.length; ++i) {
                            if (!deep_compare(x[i], y[i]))
                                return false;
                        }
                        return true;
                    }
                    else if (Array.isArray(y)) {
                        return false;
                    }
                    else {
                        for (i in x) {
                            if (!(i in y) || !deep_compare(x[i], y[i]))
                                return false;
                        }
                        for (i in y) {
                            if (!(i in x))
                                return false;
                        }
                        return true;
                    }
                }
                else {
                    return x == y;
                }
            }
            return false;
        }
        var process_initial_delivery = function (data) {
            var info = data.info;
            if (info && typeof info === "object") {
                update_info.call(this, info, true);
            }
        };
        var process_info_delivery = function (data) {
            var info = data.info;
            if (info && typeof info === "object") {
                update_info.call(this, info, false);
            }
        };
        var process_api_info_delivery = function (data) {
            var info = data.info, namespaces = info.namespaces, new_api = {}, new_api_module, options, options_names, event_name, list, i, j;
            for (i = 0; i < namespaces.length; ++i) {
                options = info[namespaces[i]];
                options_names = options.options;
                new_api_module = {};
                new_api[namespaces[i]] = new_api_module;
                for (j = 0; j < options_names.length; ++j) {
                    new_api_module[options_names[j]] = options[options_names[j]];
                }
            }
            if (!deep_compare(this.extended_api, new_api)) {
                var event_name = "api_change", pre = this.extended_api, event_data, list;
                this.extended_api = new_api;
                if (event_name in this.events && (list = this.events[event_name]).length > 0) {
                    event_data = {
                        current: {
                            extended_api: this.extended_api
                        },
                        previous: {
                            extended_api: pre
                        }
                    };
                    for (i = 0; i < list.length; ++i) {
                        list[i].call(this, event_data);
                    }
                }
            }
        };
        var process_on_ready = function (data) {
            if (this.listening_interval !== null) {
                clearInterval(this.listening_interval);
                this.listening_interval = null;
            }
            var events_map = this.events_queued, list, e, i;
            this.events_queued = null;
            for (e in events_map) {
                list = events_map[e];
                for (i = 0; i < list.length; ++i) {
                    on_private.call(this, e, list[i], false);
                }
            }
        };
        var process_event = function (data) {
            var event = data.event, event_data, list, i;
            if (event && typeof event === "string" && event in event_map_native_reversed) {
                event = event_map_native_reversed[event];
                if (event in this.events && (list = this.events[event]).length > 0) {
                    event_data = {
                        value: data.info
                    };
                    for (i = 0; i < list.length; ++i) {
                        list[i].call(this, event_data);
                    }
                }
            }
        };
        var update_info = function (info, initial) {
            var previous = {}, events_performed, event_name, event_vars, event_data, list, v, i, p;
            for (v in info) {
                if (v in player_vars_rename_map) {
                    i = info[v];
                    v = player_vars_rename_map[v];
                    p = this[v];
                    if (!deep_compare(p, i)) {
                        previous[v] = p;
                        this[v] = i;
                    }
                }
            }
            if (initial)
                return;
            events_performed = {};
            for (p in previous) {
                if (!(p in player_vars_events))
                    continue;
                event_name = player_vars_events[p];
                if (event_name in events_performed)
                    continue;
                events_performed[event_name] = true;
                if (!(event_name in this.events) || (list = this.events[event_name]).length == 0)
                    continue;
                event_data = {
                    current: {},
                    previous: {}
                };
                event_vars = event_map_custom[event_name];
                for (i = 0; i < event_vars.length; ++i) {
                    v = event_vars[i];
                    event_data.current[v] = this[v];
                    event_data.previous[v] = v in previous ? previous[v] : this[v];
                }
                for (i = 0; i < list.length; ++i) {
                    list[i].call(this, event_data);
                }
            }
        };
        var send_message = function (message) {
            console.log(message);
            console.log(this.url_target);
            this.iframe.contentWindow.postMessage(JSON.stringify(message), this.url_target);
        };
        var send_command = function (command, args) {
            send_message.call(this, {
                event: "command",
                func: command,
                args: args,
                id: this.id
            });
        };
        var on_window_message = function (event) {
            if (event.source === this.iframe.contentWindow) {
                var data;
                try {
                    data = JSON.parse(event.data);
                }
                catch (e) {
                    return;
                }
                if (data !== null && typeof data === "object") {
                    if ("event" in data && data.event in auto_process_events) {
                        auto_process_events[data.event].call(this, data);
                        return;
                    }
                    process_event.call(this, data);
                }
            }
        };
        var on_iframe_load = function (event) {
            on_listening_interval.call(this);
            if (this.listening_interval !== null)
                clearInterval(this.listening_interval);
            this.listening_interval = setInterval(bind_function(on_listening_interval, this), 250);
        };
        var on_listening_interval = function () {
            send_message.call(this, {
                event: "listening",
                id: this.id
            });
        };
        var auto_process_events = {
            initialDelivery: process_initial_delivery,
            infoDelivery: process_info_delivery,
            apiInfoDelivery: process_api_info_delivery,
            onReady: process_on_ready
        };
        var on_private = function (event_name, callback, immediate) {
            if (this.events_queued === null) {
                if (event_name == "ready") {
                    callback.call(this, {
                        immediate: immediate
                    });
                }
                else if (event_name in event_map_native) {
                    if (event_name in this.events) {
                        this.events[event_name].push(callback);
                    }
                    else {
                        this.events[event_name] = [callback];
                        send_command.call(this, "addEventListener", [event_map_native[event_name]]);
                    }
                }
                else if (event_name in event_map_custom) {
                    if (event_name in this.events) {
                        this.events[event_name].push(callback);
                    }
                    else {
                        this.events[event_name] = [callback];
                    }
                }
                else {
                    return false;
                }
            }
            else {
                var e_list = event_name in event_map_custom ? this.events : this.events_queued;
                if (event_name in e_list) {
                    e_list[event_name].push(callback);
                }
                else {
                    e_list[event_name] = [callback];
                }
            }
            return true;
        };
        Player.prototype = {
            constructor: Player,
            destroy: function () {
                remove_event_listeners(this.node_events);
                this.node_events = null;
                var par = this.iframe.parentNode;
                if (par)
                    par.removeChild(this.iframe);
            },
            get_iframe: function () {
                return this.iframe;
            },
            on: function (event_name, callback) {
                return on_private.call(this, event_name, callback, true);
            },
            off: function (event_name, callback) {
                var events_map = this.events_queued === null ? this.events : this.events_queued;
                if (event_name in events_map) {
                    var list = events_map[event_name], i;
                    for (i = 0; i < list.length; ++i) {
                        if (list[i] === callback) {
                            list.splice(i, 1);
                            return true;
                        }
                    }
                }
                return false;
            },
            play: function () {
                send_command.call(this, "playVideo", []);
            },
            pause: function () {
                send_command.call(this, "pauseVideo", []);
            },
            stop: function () {
                send_command.call(this, "stopVideo", []);
            },
            clear: function () {
                send_command.call(this, "clearVideo", []);
            },
            mute: function () {
                send_command.call(this, "mute", []);
            },
            unmute: function () {
                send_command.call(this, "unMute", []);
            },
            seek: function (timecode, allow_seek_ahead) {
                send_command.call(this, "seekTo", [timecode, allow_seek_ahead]);
            },
            goto_next: function () {
                send_command.call(this, "nextVideo", []);
            },
            goto_previous: function () {
                send_command.call(this, "previousVideo", []);
            },
            goto_at: function (index) {
                send_command.call(this, "playVideoAt", [index]);
            },
            load_video: function (video_id, autoplay, quality, start_time, end_time) {
                var args = {
                    videoId: video_id
                };
                if (quality != null)
                    args["suggestedQuality"] = quality;
                if (start_time != null)
                    args["startSeconds"] = start_time;
                if (end_time != null)
                    args["endSeconds"] = end_time;
                send_command.call(this, autoplay ? "loadVideoById" : "cueVideoById", [args]);
            },
            load_video_from_url: function (video_url, autoplay, quality, start_time, end_time) {
                var args = {
                    mediaContentUrl: video_url
                };
                if (quality != null)
                    args["suggestedQuality"] = quality;
                if (start_time != null)
                    args["startSeconds"] = start_time;
                if (end_time != null)
                    args["endSeconds"] = end_time;
                send_command.call(this, autoplay ? "loadVideoByUrl" : "cueVideoByUrl", [args]);
            },
            load_playlist: function (playlist, type, index, autoplay, quality, start_time) {
                var args;
                if (Array.isArray(playlist)) {
                    args = [playlist, index != null ? index : 0, start_time != null ? start_time : 0];
                    if (quality != null)
                        args.push(quality);
                }
                else {
                    args = {
                        list: playlist
                    };
                    if (type != null && (type == "playlist" || type == "search" || type == "user_uploads")) {
                        args["listType"] = type;
                    }
                    if (index != null)
                        args["index"] = index;
                    if (quality != null)
                        args["suggestedQuality"] = quality;
                    if (start_time != null)
                        args["startSeconds"] = start_time;
                    args = [args];
                }
                send_command.call(this, autoplay ? "loadPlaylist" : "cuePlaylist", args);
            },
            is_ready: function () {
                return this.events_queued === null;
            },
            set_volume: function (volume) {
                send_command.call(this, "setVolume", [volume]);
            },
            get_volume: function () {
                return this.volume;
            },
            is_muted: function () {
                return this.muted;
            },
            set_playback_rate: function (rate) {
                send_command.call(this, "setPlaybackRate", [rate]);
            },
            get_playback_rate: function () {
                return this.playback_rate;
            },
            get_playback_rates_available: function () {
                return this.playback_rates_available;
            },
            set_playback_quality: function (quality) {
                send_command.call(this, "setPlaybackQuality", [quality]);
            },
            get_playback_quality: function () {
                return this.playback_quality;
            },
            get_playback_qualities_available: function () {
                return this.playback_qualities_available;
            },
            set_loop: function (loop_playlist) {
                send_command.call(this, "setLoop", [loop_playlist]);
            },
            set_shuffle: function (shuffle_playlist) {
                send_command.call(this, "setShuffle", [shuffle_playlist]);
            },
            get_loaded_fraction: function () {
                return this.loaded_fraction;
            },
            get_player_state: function () {
                return this.player_state;
            },
            get_current_time: function () {
                return this.current_time;
            },
            get_duration: function () {
                return this.duration;
            },
            get_video_data: function () {
                return this.video_data;
            },
            get_playlist: function () {
                return this.playlist;
            },
            get_playlist_index: function () {
                return this.playlist_index;
            },
            get_api: function () {
                return this.extended_api;
            },
            set_api: function (module, option, value) {
                send_command.call(this, "setOption", [module, option, value]);
            }
        };
        return Player;
    })();
    return {
        version_info: version_info,
        supported: support_check(),
        Player: Player
    };
})();
//# sourceMappingURL=Youtube.js.map