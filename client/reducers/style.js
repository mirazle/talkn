import Schema from 'common/schemas/Schema';
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

export default ( state = {} , action ) => {

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
			container: {...state.container,
				multistreamIconWrap: {...state.container.multistreamIconWrap,
					border: Container.getMultistreamIconWrapBorder( action)
				}
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
