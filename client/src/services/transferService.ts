import callWebApi from 'helpers/webApiHelper';
import { TransferType } from 'types/transfer.type';

export const postTransfers = async (transfers: TransferType[], gameweek_id: string) => {
  const transfersToSend = transfers.map(({ in_player, out_player }) => ({
    in_player: in_player.id,
    out_player: out_player.id,
  }));

  const response = await callWebApi({
    endpoint: `/api/gameweek-history/transfers/${gameweek_id}`,
    type: 'POST',
    request: transfersToSend,
  });
  return response.json();
};
