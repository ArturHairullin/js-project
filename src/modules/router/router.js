import Route from './route';

class Router {
    constructor(rootQuery) {
        // singleton
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        // for chaining
        return this;
    }

    start() {
        window.onpopstate = (event => {
            // Событие popstate отсылается объекту window каждый раз, когда активная
            // запись истории меняется с одной на другую для одного и того же документа.
            console.log(`onpopstate`);
            console.dir({event});

            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        console.log('_onRoute', this._currentRoute, this._rootQuery);

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;
