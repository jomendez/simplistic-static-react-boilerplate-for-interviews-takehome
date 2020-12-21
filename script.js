function List(props) {

    function remove(id) {
        store.dispatch(props.removeAction(id))
    }

    function toggle(id) {
        store.dispatch(props.toggle(id))
    }


    return (
        <ul>
            {(props && props.items && props.items.length > 0) && props.items.map(item => {

                const lineThrouhg = {
                    textDecoration: item.complete? 'line-through': ''
                }
                return (
                    <li key={item.id}>
                        <span style={lineThrouhg} onClick={() => toggle(item.id)}>{item.name}</span>
                        <span> <button onClick={() => { remove(item.id) }}>x</button></span>
                    </li>
                )
            })}
        </ul>
    )
}

class Todos extends React.Component {

    render() {
        return (
            <div>
                TODOS

                <List items={this.props.todos} removeAction={(id) => removeTodoAction(id)} toggle={(id) => toggleTodoAction(id)} />
            </div>
        )
    }
}

class Goals extends React.Component {
    render() {
        return (
            <div>
                GOALS

                <List items={this.props.goals} removeAction={(id) => removeGoalAction(id)} toggle={(id) => toggleGoalAction(id)} />
            </div>
        )
    }
}

class InputForm extends React.Component {
    state = {
        inputTodo: '',
        inputGoal: '',
    }

    addTodo() {
        const name = this.state.inputTodo
        this.setState({ inputTodo: '' })
        store.dispatch(addTodoAction({
            name,
            complete: false,
            id: generateId()
        }))
    }

    handleTodo(e) {
        this.setState({ inputTodo: e.target.value })
    }

    addGoal() {
        const name = this.state.inputGoal
        this.setState({ inputGoal: '' })
        store.dispatch(addGoalAction({
            id: generateId(),
            complete: false,
            name,
        }))
    }

    handleGoal(e) {
        this.setState({ inputGoal: e.target.value })
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Todo List</h1>
                    <input id='todo' type='text' placeholder='Add Todo' onChange={(e) => { this.handleTodo(e) }} />
                    <button id='todoBtn' onClick={() => { this.addTodo() }}>Add Todo</button>
                </div>
                <div>
                    <h1>Goals</h1>
                    <input id='goal' type='text' placeholder='Add Goal' onChange={(e) => { this.handleGoal(e) }} />
                    <button id='goalBtn' onClick={() => { this.addGoal() }}>Add Goal</button>
                </div>
            </div>
        )
    }
}

class App extends React.Component {

    state = {
        goals: {},
        todos: {}
    }

    componentDidMount() {
        store.subscribe(() => {
            const {
                goals,
                todos
            } = store.getState()

            this.setState({
                goals,
                todos
            })
        })
    }


    render() {
        return (
            <div>
                <InputForm />
                <hr />
                <div>
                    <Todos todos={this.state.todos} />
                    <Goals goals={this.state.goals} />
                </div>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'))