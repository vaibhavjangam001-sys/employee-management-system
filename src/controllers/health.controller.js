const getHealth = (req, res) => {

    res.status(200).json({

        status: "OK",

        uptime: process.uptime(),

        timestamp: new Date().toLocaleString(),

        environment: process.env.NODE_ENV,

        nodeVersion: process.version,

        pid: process.pid,

        memoryUsage: process.memoryUsage(),

    });

};

export default getHealth;