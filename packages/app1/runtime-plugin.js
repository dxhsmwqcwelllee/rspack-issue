
window.MF_CONFIG = {
    app1: {
        url: `//${location.hostname}:3001/mf-entry.js`,
    },
    // app2: {
    //     url: `//${location.hostname}:3002/mf-entry.js`,
    // },
    app3: {
        url: `//${location.hostname}:3003/mf-entry.js`,
    }
};

export default function () {
    return {
        name: 'RuntimeRemotesPlugin',

        beforeRequest: async (args) => {
            console.log('beforeRequest', args)
            const { options, origin } = args;

            const remotes = options.remotes.map((remote) => {
                remote.entry = window.MF_CONFIG[remote.name].url;
                return remote;
            })

            origin.initOptions({
                remotes,
            })

            return args
        },
    };
}
