import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true,
    },
    {
        id: 2,
        text: '컴포넌트 스타일링 하기',
        done: true,
    },
    {
        id: 3,
        text: '콘텍스트 만들기',
        done: false,
    },
    {
        id: 4,
        text: '기능구현하기',
        done: false,
    }
]

function TodoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(
                todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(TodoReducer, initialTodos);
    const NextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={NextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }

    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }

    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }

    return context;
}