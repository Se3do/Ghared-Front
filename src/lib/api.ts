const BASE_URL = "https://ghared-project-1lb7.onrender.com";

export interface InboxTransaction {
  transaction_id: number;
  code: string;
  subject: string;
  date: string;
  sender_name: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export const fetchInbox = async (): Promise<InboxTransaction[]> => {
  const response = await fetch(`${BASE_URL}/api/transactions/inbox`);
  if (!response.ok) {
    throw new Error("Failed to fetch inbox");
  }
  const result: ApiResponse<InboxTransaction[]> = await response.json();
  return result.data;
};
