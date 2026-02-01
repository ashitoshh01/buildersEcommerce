
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_USERS, MOCK_RFQS, MOCK_LEADS, MOCK_PRODUCTS } from './mock-db';
import { UserProfile, Role, RFQ, Lead } from './types';

interface AppState {
    currentUser: UserProfile | null;
    activeRole: Role;
    rfqs: RFQ[];
    leads: Lead[];
    walletBalance: number; // For pros (credits)

    // Actions
    loginAs: (role: Role) => void;
    submitRFQ: (rfq: Omit<RFQ, 'id' | 'created_at' | 'status'>) => void;
    respondToRFQ: (rfqId: string, price: number, notes: string) => void;
    acceptQuote: (rfqId: string, quoteId: string) => void;
    unlockLead: (leadId: string) => boolean; // returns success
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            currentUser: MOCK_USERS[0], // Default to Buyer
            activeRole: 'buyer',
            rfqs: MOCK_RFQS,
            leads: MOCK_LEADS,
            walletBalance: 150, // Default pro balance

            loginAs: (role) => {
                const user = MOCK_USERS.find(u => u.role === role);
                if (user) {
                    set({
                        currentUser: user,
                        activeRole: role,
                        walletBalance: user.lead_credits || 0
                    });
                }
            },

            submitRFQ: (rfqData) => {
                const newRFQ: RFQ = {
                    ...rfqData,
                    id: `rfq-${Date.now()}`,
                    created_at: new Date().toISOString(),
                    status: 'submitted',
                };
                set(state => ({ rfqs: [newRFQ, ...state.rfqs] }));
            },

            respondToRFQ: (rfqId, price, notes) => {
                const { currentUser } = get();
                if (currentUser?.role !== 'vendor') return;

                set(state => ({
                    rfqs: state.rfqs.map(rfq => {
                        if (rfq.id === rfqId) {
                            const newQuote = {
                                id: `q-${Date.now()}`,
                                rfq_id: rfqId,
                                vendor_id: currentUser.id,
                                price,
                                notes,
                                created_at: new Date().toISOString()
                            };
                            return {
                                ...rfq,
                                quotes: [...(rfq.quotes || []), newQuote],
                                status: 'quoted'
                            };
                        }
                        return rfq;
                    })
                }));
            },

            acceptQuote: (rfqId, quoteId) => {
                set(state => ({
                    rfqs: state.rfqs.map(rfq =>
                        rfq.id === rfqId ? { ...rfq, status: 'accepted' } : rfq
                    )
                }));
            },

            unlockLead: (leadId) => {
                const { walletBalance, leads } = get();
                const lead = leads.find(l => l.id === leadId);

                if (!lead || walletBalance < lead.cost_in_credits) return false;

                set(state => ({
                    walletBalance: state.walletBalance - lead.cost_in_credits,
                    leads: state.leads.map(l =>
                        l.id === leadId ? { ...l, status: 'unlocked' } : l
                    )
                }));
                return true;
            }
        }),
        {
            name: 'structura-storage-v2', // Version bumped to force reload of new mock data
            skipHydration: false,
        }
    )
);
