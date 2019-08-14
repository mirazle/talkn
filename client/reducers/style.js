import Schema from 'common/schemas/Schema';
import App from 'common/schemas/state/App';
import Style from 'client/style/index';
import Menu from 'client/style/Menu';
import LockMenu from 'client/style/LockMenu';
import Container from 'client/style/Container';
import Posts from 'client/style/Posts';
import Detail from 'client/style/Detail';
import DetailRight from 'client/style/DetailRight';
import DetailModal from 'client/style/DetailModal';
import Header from 'client/style/Header';
import Footer from 'client/style/Footer';
import MenuFooter from 'client/style/MenuFooter';
import PostsFooter from 'client/style/PostsFooter';
import Notif from 'client/style/Notif';
import InnerNotif from 'client/style/InnerNotif';
import ExtScreen from 'client/style/ExtScreen';
import PostsSupporter from 'client/style/PostsSupporter';
import Board from 'client/style/Board';
import Links from 'client/style/Links';
import Post from '../style/Post';
import Icon from '../style/Icon';
import Audio from '../style/Media/Audio';
import Video from '../style/Media/Video';

export default ( state = {} , action ) => {

	/*

		LINKSの色を整える
		LINK CHの動作確認
		LINK CHのTIMELINE動作確認

		THREADのUPDATE機能を実装
		findをALL, HTML, MUSIC, MOVIEで選択できるようにする

*/
	switch( action.type ){
	case 'RESIZE_START_WINDOW':
	case 'RESIZE_END_WINDOW':
	case 'ON_TRANSITION' :
	case 'OFF_TRANSITION' :
	case 'ON_TRANSITION_END' :
		return new Style( action );
	case 'TOGGLE_DISP_MAIN':
		return {...state};
	case 'ON_CLICK_MULTISTREAM':
		return {...state,
			board: {...state.board,
				menuLiChild: {...state.board.menuLiChild,
					color: ( !action.app.isMediaConnection && action.app.multistream ?
						Board.activeColor : Board.unactiveColor )
				}
			}
		}

	case 'CLIENT_TO_SERVER[EMIT]:changeThread':
	case 'OPEN_LINKS':
	case 'CLOSE_LINKS':
	case 'TOGGLE_LINKS':
		console.log( action.app );
		return {...state,
			board: {...state.board,
				self: {...state.board.self,
					width: Board.getSelfWidth( action.app ),
					boxShadow: Board.getSelfBoxShadow( action.app )
				},
				menuLiChild: Board.getMenuLiChild( action ),
				menuLiLinks: Board.getMenuLiLinks( action )
			},
			links: {...state.links,
				self: {...state.links.self,
					display: Links.getSelfDisplay( action.app )
				},
				linksUl: {...state.links.linksUl,
					overflowY: Links.getLinksUlOevrflowY(action.app)
				}
			},
			icon: {...state.icon,
				thunder: Icon.getThunder( {app: action.app} ),
				bubble: Icon.getBubble( {app: action.app } ),
				links: Icon.getLinks( {app: action.app } )
			}
		}
	case 'TOGGLE_BUBBLE_POST':
		return {...state,
			board: {...state.board,
				menuLiBubble: {...state.board.menuLiBubble,
					color: ( action.app.isBubblePost ?
						Board.activeColor : Board.unactiveColor )
				}
			},
			posts: {...state.posts,
				self: Posts.getSelf(action),
				more: Posts.getMore({app: action.app})
			},
			post: {...state.post,
				self: Post.getSelf( {app: action.app} ),
				upper: Post.getUpper( {app: action.app}),
				bottomPost: Post.getBottomPost( {app: action.app} )
			}
		}
	case 'TOGGLE_DISP_POSTS_SUPPORTER':
	case 'CLOSE_DISP_POSTS_SUPPORTER':
		return {...state,
			postsSupporter: {...state.postsSupporter,
				self: {...state.postsSupporter.self,
					transform: PostsSupporter.getTransform( action.app )
				}
			}
		}
	case 'ON_CLICK_TO_TIMELINE_THREAD':
		return {...state,
			posts: {...state.posts,
				self: Posts.getSelf( action )
			},
			board: {...state.board,
				menuLiChild: {...state.menuLiChild,
					color: App.isActiveMultistream( action.app, "reducer" ) ?
						Board.activeColor : Board.unactiveColor
				},
				menuLiLinks: {...state.menuLiLinks,
					color: Board.unactiveColor
				}
			},
			video: {...state.video,
				self: Video.getSelf( {app: action.app} )
			},
			audio: {...state.audio,
				self: Audio.getSelf( {app: action.app} )
			}
		}
	case 'ON_CLICK_TO_MULTI_THREAD':
		return {...state,
			board: {...state.board,
				menuLiChild: {...state.board.menuLiChild,
					color: Board.activeColor
				},
				menuLiLinks: {...state.menuLiLinks,
					color: Board.activeColor
				}
			}
		}
	case 'ON_CLICK_TO_SINGLE_THREAD':
			return {...state,
				board: {...state.board,
					menuLiLinks: {...state.menuLiLinks,
						color: Board.activeColor
					}
				}
			}
	case 'ON_CLICK_TO_CHILD_THREAD':
		return {...state,
			board: {...state.board,
				menuLiChild: {...state.board.menuLiChild,
					color: Board.unactiveColor
				},
				menuLiLinks: {...state.menuLiLinks,
					color: Board.unactiveColor
				}
			},
			icon: {...state.icon,
				thunder: Icon.getThunder( {app: action.app} )	
			}
		}
	case 'ON_CLICK_TOGGLE_DISP_MENU':
	case 'ON_CLICK_TOGGLE_DISP_DETAIL':
		return {...state,
			menu: {...state.menu,
				self: {...state.menu.self,
					width: Menu.getWidth( action.app ),
					transform: Menu.getTransform( action.app ),
				}
			},
			detail: {...state.detail,
				[`self${Detail.detailRightSelfKey}`]: {...state.detail[`self${Detail.detailRightSelfKey}`],
					transform: DetailRight.getTransform( action.app ),
				},
				[`self${Detail.detailModalSelfKey}`]: {...state.detail[[`self${Detail.detailModalSelfKey}`]],
					transform: DetailModal.getTransform( action.app ),
				}				
			},
			posts: {...state.posts,
				self: {...state.posts.self,
					width: Posts.getWidth( action.app )
				}
			},
			footer: {...state.footer,
				self: {...state.footer.self,
					width: Footer.getWidth( action.app ),
					transform: Footer.getTransform( action.app ),
				}
			},
			menuFooter: {...state.menuFooter,
				self: {...state.menuFooter.self,
					width: MenuFooter.getWidth( action.app )
				}
			},
			postsFooter: {...state.postsFooter,
				self: {...state.postsFooter.self,
					maxWidth: PostsFooter.getWidth( action.app ),
					width: PostsFooter.getWidth( action.app )
				}
			}
		}
	case 'ON_CLICK_OPEN_LOCK_MENU':
		return {...state,
			lockMenu: {...state.lockMenu,
				menuShare: {...state.lockMenu.menuShare,
					transform: LockMenu.getCommonTransform(action.app),
				}
			}
		}
	case 'OPEN_NEW_POST':
	case 'CLOSE_NEW_POST':
		return {...state,
			container: {...state.container,
				newPost: {...state.container.newPost,
					transform: Container.getNotifTranslateY( action.app ),
				}
			}
		}
	case 'OPEN_NOTIF':
	case 'CLOSE_NOTIF':
		const notifDisplay= Notif.getNotifsDisplay( action.app );
		return {...state,
			header: {...state.header,
				self: {...state.header.self,
					transform: Header.getNotifTranslateY( action.app ),
				}
			},
			container: {...state.container,
				newPost: {...state.container.newPost,
					display: Container.getNewPostDisplay( action.app ),
				}
			},
			notif: {...state.notif,
				notifs: {...state.notif.notifs,
					height: Notif.getNotifsHeight( action.app ),
				},
				self: {...state.notif.self,
					display: notifDisplay,
				}
			}
		}
	case 'TOGGLE_DISP_BOARD' :
		return {...state,
			board: {...state.board,
				self: Board.getSelf( {app:action.app} )
			}
		}
	case 'OPEN_INNER_NOTIF' :
	case 'CLOSE_INNER_NOTIF' :
		return {...state,
			innerNotif: {...state.innerNotif,
				self: {...state.innerNotif.self,
					height: action.app.openInnerNotif !== '' ? `${InnerNotif.selfHeight}px` : '0px',
				}
			}
		}
	case 'UPDATE_STYLE':
		const { styleKey, eleType, tagName, style } = action;

		if( styleKey && eleType && tagName ){
			return {...state,
				[ styleKey ]: {...state[ styleKey ],
					[ eleType ]: {...state[ styleKey ][ eleType ],
						[ tagName ]: {...state[ styleKey ][ eleType ][ tagName ], ...style },
					}
				}
			}
		}else if( styleKey && eleType ){
			return {...state,
				[ styleKey ]: {...state[ styleKey ],
					[ eleType ]: {...state[ styleKey ][ eleType ], ...style },
				}
			}
		}
		break; 
	case 'START_DISP_POSTS' :
	case 'START_UNDISP_POSTS' :
		return {...state,
				extScreen: {...state.extScreen,
					self: {...state.extScreen.self,
						transform: ExtScreen.getSelfTransform(action.app),
						transition: ExtScreen.getSelfTransition(action.app),
					}
				},
				notif: {...state.notif,
					notifs: {...state.notif.notifs,
						display: Notif.getNotifsDisplay(action.app),
					}
				}
			}
	default:
		return action.style ? action.style : state ;
	}
};
