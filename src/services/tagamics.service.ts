import api from './api';
import { Tagamic } from '@/models/tagamic.model';

export const getTagamic = async (params: { id: string }) => {
    // Para entornos reales, usarías:
    // return api.get<{ tagamic: Tagamic }>(`/tagamics/${params.id}`);
    
    // MOCK: Simulando una llamada al backend para cumplir con la prueba actual
    return new Promise<{ data: { tagamic: Tagamic } }>((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    tagamic: {
                        id: params.id,
                        terminal: { name: `Tagamics Terminal ${params.id}` },
                        connected: true,
                        active: true,
                    }
                }
            });
        }, 1500);
    });
};
