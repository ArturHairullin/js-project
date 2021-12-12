
import Pages from './components/pages/pages.module';
import AddCard from './components/add-card/add-card.module';
import {Router} from './modules/router';

const router = new Router('.app');
// Можно обновиться на /user и получить сразу пользователя
router
    .use('/',Pages)
    .use('/add',AddCard)
    .start();

window.router = router;
// window.router.go('/user')
// window.router.go('/')
