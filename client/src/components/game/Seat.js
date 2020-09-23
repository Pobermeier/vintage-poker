import React, { useContext } from 'react';
import Button from '../buttons/Button';
import Text from '../typography/Text';
import modalContext from '../../context/modal/modalContext';
import globalContext from '../../context/global/globalContext';
import { ButtonGroup } from '../forms/ButtonGroup';
import { Form } from '../forms/Form';
import { FormGroup } from '../forms/FormGroup';
import { Input } from '../forms/Input';

export const Seat = ({ currentTable, seatNumber, isPlayerSeated, sitDown }) => {
  const { openModal, closeModal } = useContext(modalContext);
  const { chipsAmount } = useContext(globalContext);

  const seat = currentTable.seats[seatNumber];

  return (
    <>
      {!seat ? (
        <>
          {!isPlayerSeated ? (
            <Button
              small
              onClick={() => {
                openModal(
                  () => (
                    <>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();

                          const amount = +document.getElementById('amount')
                            .value;

                          if (
                            amount &&
                            amount >= 100 &&
                            amount <= chipsAmount
                          ) {
                            sitDown(
                              currentTable.id,
                              seatNumber + 1,
                              parseInt(amount),
                            );
                            closeModal();
                          }
                        }}
                      >
                        <FormGroup>
                          <Input
                            id="amount"
                            type="number"
                            min={100}
                            max={chipsAmount}
                            defaultValue={100}
                          />
                        </FormGroup>
                        <ButtonGroup>
                          <Button primary type="submit" fullWidth>
                            Deposit Amount
                          </Button>
                        </ButtonGroup>
                      </Form>
                    </>
                  ),
                  'Buy-in',
                  'No thanks!',
                );
              }}
            >
              Sit Down
            </Button>
          ) : (
            <Text>Empty Seat</Text>
          )}
        </>
      ) : (
        <>
          <Text>{seat.player.name}</Text>
          <ul>
            <li>
              <strong>Hand:</strong>{' '}
              {seat.hand &&
                seat.hand !== [] &&
                seat.hand[0] &&
                seat.hand[0].suit}
              {seat.hand &&
                seat.hand !== [] &&
                seat.hand[0] &&
                seat.hand[0].rank}{' '}
              {seat.hand &&
                seat.hand !== [] &&
                seat.hand[1] &&
                seat.hand[1].suit}
              {seat.hand &&
                seat.hand !== [] &&
                seat.hand[1] &&
                seat.hand[1].rank}
            </li>
            <li>
              <strong>Bet:</strong> {seat.bet}
            </li>
            <li>
              <strong>Stack:</strong> {seat.stack}
            </li>
            <li>
              <strong>Turn:</strong> {seat.turn.toString()}
            </li>
            <li>
              <strong>Checked:</strong> {seat.checked.toString()}
            </li>
            <li>
              <strong>Folded:</strong> {seat.folded.toString()}
            </li>
            <li>
              <strong>Sitting Out:</strong> {seat.sittingOut.toString()}
            </li>
          </ul>
        </>
      )}
    </>
  );
};
