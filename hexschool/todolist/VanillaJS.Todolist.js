let Todolist =
    function() {
        return {
            BaseDOM: document.getElementById('Todolist'),
            TaskDOM: {},
            TodosDOM: {},
            TodosData: [],
            InitList: function() {

                this.BaseDOM.innerHTML = `
                <input id="Task">
                <button onclick="Todolist.AddTodo()">Add</button>
                <ol id="Todos"></ol>
                `;

                this.TodosDOM = document.getElementById('Todos');
                this.TaskDOM = document.getElementById('Task');

                let LocalTodos = localStorage.getItem('LocalTodos');
                if (LocalTodos != null) {
                    this.TodosData = JSON.parse(LocalTodos);
                    this.Render();
                }
            },
            Render: function() {
                let TempContainer = "";
                this.TodosData.forEach((Item, Index) => {
                    let Template = `<li><input type="checkbox" onclick="Todolist.TaskComplete(@Index)" checked><span id="Content_@Index" style="@Complete">@Value</span><button onclick="Todolist.TaskDelete(@Index)">X</button></li>`;
                    Template = Template.replace('@Value', Item.Value);
                    Template = Template.replace('@Index', Index.toString());
                    Template = Template.replace('@Index', Index.toString());
                    Template = Template.replace('@Index', Index.toString());
                    console.log('Item.TaskComplete', Item.TaskComplete);
                    if (Item.TaskComplete) {
                        Template = Template.replace('@Complete', 'text-decoration:line-through');
                    } else {
                        Template = Template.replace('@Complete', 'text-decoration:none');
                        Template = Template.replace('checked', '');
                    }
                    TempContainer += Template;
                });
                this.TodosDOM.innerHTML = TempContainer;
            },
            LocalSave: function() {
                localStorage.setItem('LocalTodos', JSON.stringify(this.TodosData));
            },
            TaskComplete: function(Index) {
                let Content = document.getElementById(`Content_${Index}`);
                let StyleValue = Content.style['text-decoration'];
                if (StyleValue == '' || StyleValue == 'none') {
                    Content.style = 'text-decoration:line-through'
                    this.TodosData[Index].TaskComplete = true;
                } else if (StyleValue == 'line-through') {
                    Content.style = 'text-decoration:none;'
                    this.TodosData[Index].TaskComplete = false;
                }
                this.LocalSave();
            },
            AddTodo: function() {
                this.TodosData.push({
                    Value: this.TaskDOM.value,
                    TaskComplete: false
                });
                this.LocalSave();
                this.Render();
            },
            TaskDelete: function(Index) {
                if (confirm(`確定要刪除第${Index+1}筆資料?`)) {
                    this.TodosData.splice(Index, 1);
                    this.LocalSave();
                    this.Render();
                }
            }

        };
    }