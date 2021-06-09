let Todolist =
    function(NickName, Config) {
        return {
            PreConfig: { Todo: "SomeSetting" },
            BaseDOM: document.getElementById('Todolist'),
            TaskDOM: {},
            TodosDOM: {},
            TodosData: [],
            TodosType: "All",
            InitList: function() {

                if (Config != undefined) {
                    this.PreConfig = Config;
                }

                this.BaseDOM.innerHTML = `
                <div id="Console">
                    <input id="Task">
                    <button id="AddButton" onclick="${NickName}.AddTodo()">+</button>
                </div>
                <div>
                    <div>
                        <button onclick="${NickName}.ChangeTodosType('All')">全部</button>
                        <button onclick="${NickName}.ChangeTodosType('Done')">已完成</button>
                        <button onclick="${NickName}.ChangeTodosType('Undone')">未完成</button>
                    </div>
                    <ol id="Todos"></ol>
                </div>
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

                let TempDodos = [];

                switch (this.TodosType) {
                    case 'Done':
                        this.TodosData.forEach((Item) => {
                            if (Item.TaskComplete) {
                                TempDodos.push(Item);
                            }
                        });
                        break;
                    case 'Undone':
                        this.TodosData.forEach((Item) => {
                            if (!Item.TaskComplete) {
                                TempDodos.push(Item);
                            }
                        });
                        break;
                    default:
                        TempDodos = this.TodosData;
                        break;
                }

                let TempContainer = "";
                TempDodos.forEach((Item, Index) => {
                    let Template = `<li><input type="checkbox" onclick="${NickName}.TaskComplete(@Index)" checked><span id="Content_@Index" style="@Complete">@Value</span><button onclick="${NickName}.TaskDelete(@Index)">X</button></li>`;
                    Template = Template.replace('@Value', Item.Value);
                    Template = Template.replace('@Index', Index.toString());
                    Template = Template.replace('@Index', Index.toString());
                    Template = Template.replace('@Index', Index.toString());
                    if (Item.TaskComplete) {
                        Template = Template.replace('@Complete', 'text-decoration:line-through');
                    } else {
                        Template = Template.replace('@Complete', 'text-decoration:none');
                        Template = Template.replace('checked', '');
                    }
                    TempContainer += Template;
                });

                TempContainer += `
                <div>
                   <span>${TempDodos.length}個項目</span>
                   <button onclick="${NickName}.ClearAllDoneTodos()">清除已完成項目</button>
                </div>`;

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
            },
            ClearAllDoneTodos: function() {
                let TempContainer = [];
                this.TodosData.forEach((Item) => {
                    if (!Item.TaskComplete) {
                        TempContainer.push(Item);
                    }
                })
                this.TodosData = TempContainer;
                this.LocalSave();
                this.Render();
            },
            ChangeTodosType: function(Type) {
                this.TodosType = Type;
                this.Render();
            }
        };
    }