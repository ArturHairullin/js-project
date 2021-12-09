import Chats from './components/chats/chats.module';
import UserProfileComponent from './components/user-profile/user-profile.module';
import Pages from './components/pages/pages.module';
import AddCard from './components/add-card/add-card.module';
import {Router} from './modules/router';

const router = new Router('.app');

// Можно обновиться на /user и получить сразу пользователя
router
    .use('/user', UserProfileComponent)
    .use('/', Chats)
    .use('/page',Pages)
    .use('/add',AddCard)
    .start();

window.router = router;

//window.router.go('/add')
// window.router.go('/user')
// window.router.go('/')
