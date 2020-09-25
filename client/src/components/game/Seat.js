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
import ChipsAmountPill from './ChipsAmountPill';
import ColoredText from '../typography/ColoredText';
import PokerChip from '../icons/PokerChip';

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

const Hand = styled.div`
  display: flex;

  * ~ * {
    margin-left: -1.25rem;
  }
`;

const NameTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 150px;
  padding: 0.15rem 2rem;
  position: absolute;
  background: #f7f2dc;
  opacity: 0.85;
  border-radius: 40px;
  z-index: 55;
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
        <PositionedUISlot
          style={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PositionedUISlot top="-6rem" left="-75px">
            <NameTag>
              <ColoredText primary textAlign="center">
                {seat.player.name}
                <br />
                {seat.stack && (
                  <ColoredText secondary>
                    (<PokerChip width="15" height="15" />{' '}
                    {new Intl.NumberFormat(
                      document.documentElement.lang,
                    ).format(seat.stack)}
                    )
                  </ColoredText>
                )}
              </ColoredText>
            </NameTag>
          </PositionedUISlot>
          <PositionedUISlot>
            <OccupiedSeat seatNumber={seatNumber} hasTurn={seat.turn} />
          </PositionedUISlot>
          <PositionedUISlot
            left="4vh"
            style={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              scale: '0.65',
            }}
          >
            <Hand>
              {seat.hand &&
                seat.hand.map((card, index) => (
                  <PokerCard
                    key={index}
                    card={card}
                    width="5vw"
                    maxWidth="60px"
                    minWidth="30px"
                  />
                ))}
            </Hand>
          </PositionedUISlot>
          <PositionedUISlot top="5vh" style={{ minWidth: '150px' }}>
            <ChipsAmountPill chipsAmount={seat.bet} />
            {!currentTable.handOver && seat.lastAction && (
              <InfoPill>{seat.lastAction}</InfoPill>
            )}
          </PositionedUISlot>
        </PositionedUISlot>
      )}
    </>
  );
};
