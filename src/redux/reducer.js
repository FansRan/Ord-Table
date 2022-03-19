import { LinkedTask } from "../utils/model/data.model";

const initialState = {
    tasksCount: 0,
    allTasks: {},
    listTasks: [],
    linkedTask: new LinkedTask(),
    finalDate: 0,
    criticalPath: null,
    computable: false,
    computing: false,
    computed: false,
    raz: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "INITIATE":
            return {
                tasksCount: action.count,
                allTasks: action.all,
                listTasks: action.list,
                linkedTask: new LinkedTask(),
                finalDate: 0,
                criticalPath: null,
                computable: false,
                computing: false,
                computed: false,
                raz: true,
            };
        case "INITIATED":
            return {
                ...state,
                computable: false,
                raz: false,
            };
        case "COMPUTABLE":
            return {
                ...state,
                computable: action.computabled,
            };
        case "COMPUTE":
            return {
                ...state,
                computing: true,
            };
        case "COMPUTED":
            return {
                ...state,
                finalDate: action.final,
                criticalPath: action.path,
                computing: false,
                computed: true,
            };
        default:
            return state;
    }
};
