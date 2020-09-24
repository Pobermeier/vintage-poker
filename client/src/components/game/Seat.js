import React, { useContext, useEffect } from 'react';
import Button from '../buttons/Button';
import Text from '../typography/Text';
import modalContext from '../../context/modal/modalContext';
import globalContext from '../../context/global/globalContext';
import { ButtonGroup } from '../forms/ButtonGroup';
import { Form } from '../forms/Form';
import { FormGroup } from '../forms/FormGroup';
import { Input } from '../forms/Input';
import styled from 'styled-components';
import gameContext from '../../context/game/gameContext';

const EmptySeat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 10vw;
  min-width: 100px;
  max-width: 120px;
  height: 10vw;
  min-height: 100px;
  max-height: 120px;
  padding: 1rem;
  border-radius: 100%;
  background: rgba(247, 242, 220, 0.8);
  border: 5px solid #6297b5;
`;

export const Seat = ({ currentTable, seatNumber, isPlayerSeated, sitDown }) => {
  const { openModal, closeModal } = useContext(modalContext);
  const { chipsAmount } = useContext(globalContext);
  const { standUp, seatId, rebuy } = useContext(gameContext);

  const seat = currentTable.seats[seatNumber];
  const maxBuyin = currentTable.limit;
  const minBuyIn = currentTable.minBet * 2 * 10;

  useEffect(() => {
    if (
      currentTable &&
      isPlayerSeated &&
      seat &&
      seat.id === seatId &&
      seat.stack === 0 &&
      seat.sittingOut
    ) {
      if (chipsAmount <= minBuyIn || chipsAmount === 0) {
        standUp();
      } else {
        openModal(
          () => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();

                const amount = +document.getElementById('amount').value;

                if (
                  amount &&
                  amount >= minBuyIn &&
                  amount <= chipsAmount &&
                  amount <= maxBuyin
                ) {
                  rebuy(currentTable.id, seatNumber + 1, parseInt(amount));
                  closeModal();
                }
              }}
            >
              <FormGroup>
                <Input
                  id="amount"
                  type="number"
                  min={minBuyIn}
                  max={chipsAmount <= maxBuyin ? chipsAmount : maxBuyin}
                  defaultValue={minBuyIn}
                />
              </FormGroup>
              <ButtonGroup>
                <Button primary type="submit" fullWidth>
                  Buy into game
                </Button>
              </ButtonGroup>
            </Form>
          ),
          'Rebuy',
          'No thanks!',
          () => {
            standUp();
            closeModal();
          },
          () => {
            standUp();
            closeModal();
          },
        );
      }
    }
    // eslint-disable-next-line
  }, [currentTable]);

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
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();

                        const amount = +document.getElementById('amount').value;

                        if (
                          amount &&
                          amount >= minBuyIn &&
                          amount <= chipsAmount &&
                          amount <= maxBuyin
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
                          min={minBuyIn}
                          max={chipsAmount <= maxBuyin ? chipsAmount : maxBuyin}
                          defaultValue={minBuyIn}
                        />
                      </FormGroup>
                      <ButtonGroup>
                        <Button primary type="submit" fullWidth>
                          Buy into game
                        </Button>
                      </ButtonGroup>
                    </Form>
                  ),
                  'Buy In',
                  'No thanks!',
                );
              }}
            >
              Sit Down
            </Button>
          ) : (
            <EmptySeat>
              Empty
              <br />
              Seat
            </EmptySeat>
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
