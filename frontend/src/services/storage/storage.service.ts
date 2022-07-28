interface IStorage {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
    clear: () => void;
}

class StorageService {
    private storage: IStorage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    getItem(key: string): string {
        return this.storage.getItem(key) || '';
    }

    setItem(key: string, value: string): void {
        return this.storage.setItem(key, value);
    }

    removeItem(key: string): void {
        return this.storage.removeItem(key);
    }

    clear(): void {
        return this.storage.clear();
    }
}

export default StorageService;