export enum ManagerStatus {
    Shutdown,
    Initializing,
    Started,
    Spining
}

export interface IGameManager {
    status:ManagerStatus;
    Startup(): void;
}