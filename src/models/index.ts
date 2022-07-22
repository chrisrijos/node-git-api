interface PullRequestMetadata {
    author: any;
    id: string;
    number: number;
    title: string;
    base: Base;
    commits: any;
    message?: any;
    payload?: any;
    sha?: any;
}

interface CommitMetadata {
    request?: Request
}

interface Base {
    user: User;
}

interface Request {
    data?: Data
}

interface Data {
    data?: any;
}

interface User {
    login: string;
}