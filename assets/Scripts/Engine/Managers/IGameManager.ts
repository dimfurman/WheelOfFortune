export enum ManagerStatus {
    Shutdown,
    Initializing,
    Started
}

export interface IGameManager {
    status:ManagerStatus;
    Startup(): void;
}