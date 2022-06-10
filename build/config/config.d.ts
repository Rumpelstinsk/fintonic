import mongoose from 'mongoose';
export declare const config: {
    server: {
        hostname: string;
        port: string | number;
    };
    db: {
        connectionString: string;
        options: mongoose.ConnectOptions;
        name: string;
        username: string;
        password: string;
        host: string;
    };
};
