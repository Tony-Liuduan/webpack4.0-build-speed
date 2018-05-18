import Loadable from 'react-loadable';

function Loading({ isLoading, pastDelay, timedOut, error, retry }) {
    /* props = {
        "isLoading": true, 
        "pastDelay": false, 
        "timedOut": false, 
        "error": null, 
        "retry": () => {} 
    } */
    /* function retry() {
        _this.setState({ error: null, loading: true });
        res = loadFn(opts.loader);
        _this._loadModule();
    } */
    if (error) {
        return <div>Error! <button onClick={retry}>Retry</button></div>;
    } else if (timedOut) {
        return <div>Taking a long time... <button onClick={retry}>Retry</button></div>;
    } else if (pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}

export default loadComponent => {
    return Loadable({
        loader: () => loadComponent,
        loading: Loading,
        delay: 300, // 0.3 seconds
    });
}