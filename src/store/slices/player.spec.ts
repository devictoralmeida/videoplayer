import { describe, expect, it } from "vitest";
import { player as reducer, play, next, IPlayerState } from "./player";

const exampleState: IPlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: "Iniciando com React",
        lessons: [
          { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
          {
            id: "w-DW4DhDfcw",
            title: "Estilização do Post",
            duration: "10:05",
          },
        ],
      },
      {
        id: 2,
        title: "Estrutura da aplicação",
        lessons: [
          {
            id: "gE48FQXRZ_o",
            title: "Componente: Comment",
            duration: "13:45",
          },
          { id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
        ],
      },
    ],
  },
  isLoading: false,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
};

describe("player slice", () => {
  it("Should be able to play a video", () => {
    const state = reducer(exampleState, play([1, 2])); // os números do play foram aleatórios

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(2);
  });

  it("Should be able to play next video automatically", () => {
    const state = reducer(exampleState, next());

    expect(state.currentModuleIndex).toEqual(0);
    expect(state.currentLessonIndex).toEqual(1);
  });

  it("Should be able to jump to the next module automatically", () => {

    const state = reducer({
        ...exampleState,
        currentLessonIndex: 1, // começando na última aula do módulo 1
    }, next());

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(0);
  });

  it("Should not update the current module and lesson index if there isn't next lesson avaliable", () => {

    const state = reducer({
        ...exampleState,
        currentLessonIndex: 1,
        currentModuleIndex: 1,
    }, next());

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(1);
  });
});
