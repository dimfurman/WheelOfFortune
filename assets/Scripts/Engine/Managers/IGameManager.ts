export enum ManagerStatus {
    Shutdown,
    Initializing,
    Started,
    Spining// when wheel is spining
}

export interface IGameManager {
    status:ManagerStatus;
    Startup(): void;
}