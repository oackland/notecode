import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import axios from 'axios';

interface IpInfo {
    ip: string;
    hostname: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
}

interface IpInfoProviderProps {
    children: ReactNode;
}

interface ContextType {
    myip: IpInfo | null;
    myCity: string | null;
    error: string | null;
}

const IpInfoContext = createContext<ContextType | undefined>(undefined);

export const useIpInfo = (): ContextType => {
    const context = useContext(IpInfoContext);
    if (!context) {
        throw new Error('useIpInfo must be used within a IpInfoProvider');
    }
    return context;
};

export const IpInfoProvider: React.FC<IpInfoProviderProps> = ({children}) => {
    const [myip, setMyIp] = useState<IpInfo | null>(null);
    const [myCity, setMyCity] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIPInfo = async (): Promise<void> => {
            try {
                const ipResponse = await axios.get('/api/ipinfo');
                setMyIp(ipResponse.data);
                const cityResponse = await axios.get('/api/userlocation');
                setMyCity(cityResponse.data.city);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
            }
        };

        fetchIPInfo();
    }, []);

    return (
        <IpInfoContext.Provider value={{myip, myCity, error}}>
            {children}
        </IpInfoContext.Provider>
    );
};
