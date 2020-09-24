import React, { useContext, useEffect } from 'react';
import Button from '../buttons/Button';
import modalContext from '../../context/modal/modalContext';
import globalContext from '../../context/global/globalContext';
import { ButtonGroup } from '../forms/ButtonGroup';
import { Form } from '../forms/Form';
import { FormGroup } from '../forms/FormGroup';
import { Input } from '../forms/Input';
import styled from 'styled-components';
import gameContext from '../../context/game/gameContext';
import userImages from './userImages';
import { PositionedUISlot } from './PositionedUISlot';
import { InfoPill } from './InfoPill';
import PokerCard from './PokerCard';
import Text from '../typography/Text';
import ChipsAmountPill from './ChipsAmountPill';

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

const OccupiedSeat = styled(EmptySeat)`
  background-image: ${({ seatNumber }) => `url(${userImages[seatNumber]})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0;
  border: ${({ hasTurn }) =>
    hasTurn ? `8px solid #219653` : `5px solid #6297b5`};
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
        <PositionedUISlot>
          <PositionedUISlot top="-9vh" style={{ minWidth: '150px' }}>
            <Text>{seat.player.name}</Text>
          </PositionedUISlot>
          <PositionedUISlot>
            <OccupiedSeat seatNumber={seatNumber} hasTurn={seat.turn} />
          </PositionedUISlot>
          <PositionedUISlot left="2vh" style={{ scale: '0.65' }}>
            {seat.hand &&
              seat.hand.map((card, index) => (
                <PokerCard key={index} card={card} />
              ))}
          </PositionedUISlot>
          <PositionedUISlot top="3vh" style={{ minWidth: '150px' }}>
            <div>
              {seat.stack && <ChipsAmountPill chipsAmount={seat.stack} />}
              {!currentTable.handOver && seat.checked && (
                <InfoPill>CHECK</InfoPill>
              )}
              {!currentTable.handOver && seat.folded && (
                <InfoPill>FOLD</InfoPill>
              )}
              {!currentTable.handOver && seat.sittingOut && (
                <InfoPill>SITTING OUT</InfoPill>
              )}
            </div>
          </PositionedUISlot>
        </PositionedUISlot>
      )}
    </>
  );
};
