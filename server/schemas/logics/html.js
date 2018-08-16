import conf from '~/common/conf';
import Sequence from '~/common/Sequence';

export default {
  protocol: { type: String, default: Sequence.HTTPS_PROTOCOL },
  title: { type: String, default: "" },
  contentType: { type: String, default: "text/html" },
  serverMetas: {
    title: { type: String, default: "talkn" },
    keywords: { type: String, default: "talkn" },
    description: { type: String, default: "talkn thread" },
    'og:type': { type: String, default: "" },
    'og:title': { type: String, default: "talkn" },
    'og:image': { type: String, default: `//${conf.assetsImgPath}talkn_logo1.png`},
    'og:description': { type: String, default: "talkn thread" },
    'og:locale': { type: String, default: "" },
    'fb:app_id': { type: String, default: "" },
    'twitter:app:country': { type: String, default: "" },
    'twitter:card': { type: String, default: "" },
    'twitter:title': { type: String, default: "" },
    'twitter:description': { type: String, default: "" },
    'twitter:site': { type: String, default: "" },
    'twitter:image': { type: String, default: "" },
    'twitter:app:name:iphone': { type: String, default: "" },
    'twitter:app:id:iphone': { type: String, default: "" },
    'twitter:app:url:iphone': { type: String, default: "" },
    'twitter:app:name:googleplay': { type: String, default: "" },
    'twitter:app:id:googleplay': { type: String, default: "" },
    'twitter:app:url:googleplay': { type: String, default: "" },
    'al:ios:app_name': { type: String, default: "" },
    'al:ios:app_store_id': { type: String, default: "" },
    'al:ios:url': { type: String, default: "" },
    'al:android:app_name': { type: String, default: "" },
    'al:android:package': { type: String, default: "" },
    'al:android:url': { type: String, default: "" },
  },
  links:{ type: [], default: []},
  h1s:{ type: [], default: []},
  audios:{ type: [], default: []},
  videos:{ type: [], default: []}
}
