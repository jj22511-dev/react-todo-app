import {useState} from 'react';

export default function Todo() {
	const [action, setAction] = useState("");
	const [todos, setTodos] = useState([
		{ id: 1, action: "eat" },
		{ id: 2, action: "sleep" },
		{ id: 3, action: "walk" },
		{ id: 4, action: "run" },
	]);

	function inputHandler(event) {
		const action = event.target.value;
		setAction(action);
	}

	function save() {
		if(!action.trim()) return;
		const todo = { id: todos.length + 1, action: action}
		setTodos([...todos, todo]);
		setAction("");
	}


	function clearAll() {
		setTodos([]);
	}

	function remove(todoID, event) {
		const newTodos = todos.filter(({id}) => (id !== todoID));
		setTodos(newTodos);
	}

	return (
		<div className="todo h-screen bg-gray-400 flex justify-center py-8">
			<div className="container w-1/3 h-4/6 bg-gray-100 shadow-md rounded p-6">
				<p className="text-3xl font-semibold">Todo App</p>
				<div className="flex justify-between text-2xl py-4">
					<input onChange={inputHandler} className="w-full" type="text" placeholder="Add your new todo" value={action}/>
					<button onClick={save} className="bg-green-400 hover:bg-green-700 px-2 ml-2">
						<i className="fa fa-plus text-gray-200"></i>
					</button>
				</div>

				{ todos.length > 0 ?
					(
						<div>
							<div className="max-h-96 overflow-y-auto border-solid border-gray-300">
								<ul>
								{todos.map(({action, id}) => (
									<li className="text-2xl py-1" key={id}>
										<div className="flex justify-between">
											<span className="w-full cursor-pointer">{action}</span>
											<button onClick={(event) => remove(id, event)} className="bg-red-400 hover:bg-red-700 px-2 ml-2">
												<i className="fa fa-minus text-gray-200"></i>
											</button>
										</div>
									</li>
								))}
								</ul>
							</div>

							<div className="flex justify-between text-xl py-4">
								<span>You have {todos.length} pending task/s </span>
								<button onClick={clearAll} className="bg-green-400 hover:bg-green-700 px-2 ml-2 text-gray-200">
									Clear All
								</button>
							</div>
						</div>
					) : (
						<div className="bg-yellow-100 flex justify-center">
							<p>Empty List</p>
						</div>
					)
				}
			</div>
		</div>
	)
}