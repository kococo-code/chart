import { Container, ScoreBoard } from "@kylo/dom";
import { useEffect, useState } from "react";

export default function _ScoreBoard() {
  return (
    <Container className="flex gap-4 h-fit">
      <Container.Title>SKU Counts</Container.Title>
      <div className="flex gap-2 flex-wrap">
        <ScoreBoard className="p-4">
          <ScoreBoard.Score status="negative" fontSize="2xl">
            120
          </ScoreBoard.Score>
          <div className="flex justify-center gap-1 items-center">
            <ScoreBoard.Pop status="negative">-2개</ScoreBoard.Pop>
            <span className="text-sm text-[#878787] text-normal">
              vs yesterday
            </span>
          </div>
        </ScoreBoard>
        <ScoreBoard className="p-4">
          <ScoreBoard.Score status="positive" fontSize="2xl">
            150
          </ScoreBoard.Score>
          <div className="flex justify-center gap-1 items-center">
            <ScoreBoard.Pop status="positive">+2개</ScoreBoard.Pop>
            <span className="text-sm text-[#878787] text-normal">
              vs yesterday
            </span>
          </div>
        </ScoreBoard>
        <ScoreBoard className="p-4">
          <ScoreBoard.Score status="idle" fontSize="2xl">
            150
          </ScoreBoard.Score>
          <div className="flex justify-center gap-1 items-center">
            <ScoreBoard.Pop status="idle">-</ScoreBoard.Pop>
            <span className="text-sm text-[#878787] text-normal">
              vs yesterday
            </span>
          </div>
        </ScoreBoard>
      </div>
    </Container>
  );
}
