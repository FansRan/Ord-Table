import { LinkedTask } from "../utils/model/data.model";

const initialState = {
    tasksCount: 0,
    allTasks: {},
    listTasks: [],
    linkedTask: new LinkedTask(),
    finalDate: 0,
    criticalPath: null,
    computing: false,
    computed: false,
    raz: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIATE': return {            
            tasksCount: action.count,
            allTasks: action.all,
            listTasks: action.list,
            linkedTask: new LinkedTask(),
            finalDate: 0,
            criticalPath: null,
            computing: false,
            computed: false,
            raz: true
        }
        case 'INITIATED': return {
            ...state,
            raz: false
        }
        case 'COMPUTE': return {
            ...state,
            computing: true
        }
        case 'COMPUTED': return {
            ...state,
            finalDate: action.final,
            criticalPath: action.path,
            computing: false,
            computed: true
        }
        default: return state
    }
}

export default reducer;