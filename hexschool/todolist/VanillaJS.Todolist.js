let Todolist =
    function(NickName, Config) {
        return {
            PreConfig: { Todo: "SomeSetting" },
            BaseDOM: document.getElementById('Todolist'),
            TaskDOM: {},
            TodosDOM: {},
            SortBtnBoxDOM: {},
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
                <div id="TodosBox">
                    <div id="SortBtnBox"></div>
                    <ol id="Todos"></ol>
                </div>
                `;

                this.TodosDOM = document.getElementById('Todos');
                this.TaskDOM = document.getElementById('Task');
                this.SortBtnBoxDOM = document.getElementById('SortBtnBox');

                let LocalTodos = localStorage.getItem('LocalTodos');
                if (LocalTodos != null) {
                    this.TodosData = JSON.parse(LocalTodos);
                    this.Render();
                }
            },
            Render: function() {

                let TempDodos = [];
                let TempContainer = "";
                this.TodosData.forEach((Item, Index) => {
                    let Template = `
                    <li style="@display">
                    <input id="CBtn_@Index" type="checkbox" onclick="${NickName}.TaskComplete(@Index)" checked>
                    <label for="CBtn_@Index"></label>
                    <span id="Content_@Index" style="@Complete">@Value</span>
                    <button onclick="${NickName}.TaskDelete(@Index)">X</button>
                    </li>`;

                    if (this.TodosType != 'All') {
                        if (Item.TaskComplete && this.TodosType == 'Done') {
                            Template = Template.replace('@display', '');
                        } else if (!Item.TaskComplete && this.TodosType == 'Undone') {
                            Template = Template.replace('@display', '');
                        } else if (!Item.TaskComplete && this.TodosType == 'Done') {
                            Template = Template.replace('@display', 'display:none;');
                        } else if (Item.TaskComplete && this.TodosType == 'Undone') {
                            Template = Template.replace('@display', 'display:none;');
                        }
                    }

                    Template = Template.replace('@Value', Item.Value);
                    Template = Template.replaceAll('@Index', Index.toString());
                    if (Item.TaskComplete) {
                        Template = Template.replace('@Complete', 'text-decoration:line-through');
                    } else {
                        Template = Template.replace('@Complete', 'text-decoration:none');
                        Template = Template.replace('checked', '');
                    }
                    TempContainer += Template;
                });

                if (this.TodosData.length > 0) {

                    let SortTemp = `
                        <button @All onclick="${NickName}.ChangeTodosType('All')">全部</button>
                        <button @Done onclick="${NickName}.ChangeTodosType('Done')">已完成</button>
                        <button @Undone onclick="${NickName}.ChangeTodosType('Undone')">未完成</button>
                    `;

                    const BlackBorder = `style="border-color: black;"`;
                    switch (this.TodosType) {
                        case 'Done':
                            SortTemp = SortTemp.replace('@Done', BlackBorder);
                            break;
                        case 'Undone':
                            SortTemp = SortTemp.replace('@Undone', BlackBorder);
                            break;
                        default:
                            SortTemp = SortTemp.replace('@All', BlackBorder);
                            break;
                    }

                    this.SortBtnBoxDOM.innerHTML = SortTemp;

                    TempContainer += `
                    <div id="FooterToolBar">
                        <span>${TempDodos.length}個項目</span>
                        <button onclick="${NickName}.ClearAllDoneTodos()">清除已完成項目</button>
                    </div>`;

                } else {
                    this.SortBtnBoxDOM.innerHTML = "";
                }

                this.ClearTask();
                this.TodosDOM.innerHTML = TempContainer;
            },
            LocalSave: function() {
                localStorage.setItem('LocalTodos', JSON.stringify(this.TodosData));
            },
            TaskComplete: function(Index) {

                // let Content = document.getElementById(`Content_${Index}`);
                // let StyleValue = Content.style['text-decoration'];
                // if (StyleValue == '' || StyleValue == 'none') {
                //     Content.style = 'text-decoration:line-through'
                //     this.TodosData[Index].TaskComplete = true;
                // } else if (StyleValue == 'line-through') {
                //     Content.style = 'text-decoration:none;'
                //     this.TodosData[Index].TaskComplete = false;
                // }

                let Content = document.getElementById(`Content_${Index}`);
                if (this.TodosData[Index].TaskComplete) {
                    Content.style = 'text-decoration:none;'
                    this.TodosData[Index].TaskComplete = false;
                } else {
                    Content.style = 'text-decoration:line-through'
                    this.TodosData[Index].TaskComplete = true;
                }

                this.LocalSave();
                this.Render();
            },
            AddTodo: function() {
                let Value = this.TaskDOM.value.replaceAll('<script>', '');
                Value = Value.replaceAll('</script>', '');
                this.TodosData.push({
                    Value: Value,
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
                if (confirm(`確定要刪除全部已完成資料 ?`)) {
                    let TempContainer = [];
                    this.TodosData.forEach((Item) => {
                        if (!Item.TaskComplete) {
                            TempContainer.push(Item);
                        }
                    })
                    this.TodosData = TempContainer;
                    this.LocalSave();
                    this.Render();
                }
            },
            ChangeTodosType: function(Type) {
                this.TodosType = Type;
                this.Render();
            },
            ClearTask: function() {
                this.TaskDOM.value = "";
            }
        };
    }