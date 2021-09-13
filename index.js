const View = (() => {
    const domString = {
        counterOverdue: 'overdue_counter',
        counterDuesoon: 'duesoon_counter',
        counterAll: 'all_counter',
        taskList: 'task_list_section',
        toggle: 'toggle_btn'
    }

    const render = (element, htmltmp) => {
        element.innerHTML = htmltmp;
    }

    return {
        domString,
        render,
    }
})();

const Model = (() => {

    class Task {
        constructor(id, title, isTask, isOverdue, counter) {
            this.id = id,
            this.title = title,
            this.isTask = isTask,
            this.isOverdue = isOverdue,
            this.counter = counter
        }
    }

    const tasks = [
        new Task(1, 'Aaa aaa aa', true, true, 1),
        new Task(2, 'Bbb bbb bb', true, false, 5),
        new Task(3, 'Ccc cc cc cc c', true, true, 3),
        new Task(4, 'Dddd dd dddd', true, false, 1),
        new Task(5, 'Eeeeeeeeee', true, true, 1),
    ];

    return {
        tasks
    };
})();

const Controler = ((view, model) => {
    const taskArry = model.tasks;

    const taskCounter = arr => {
        let overdue = 0;
        let duesoon = 0;
        for (const obj of arr) {
            if (obj.isOverdue) {
                overdue += obj.counter;
            } else {
                duesoon += obj.counter;
            }
        }
        let all = overdue + duesoon;

        const overdueElement = document.querySelector('#' + view.domString.counterOverdue);
        const duesoonElement = document.querySelector('#' + view.domString.counterDuesoon);
        const allElement = document.querySelector('#' + view.domString.counterAll);
        view.render(overdueElement, overdue);
        view.render(duesoonElement, duesoon);
        view.render(allElement, all);
    }

    const showTask = arr => {
        let htmltmp = '';
        for (const obj of arr) {
            if (obj.isOverdue) {
                htmltmp += `
                <tr>
                    <td class="task_list_column"><input type="checkbox">${obj.title} </td>
                    <td><span id="overdue_number">${obj.counter}</span> overdue </td>
                    <td class="empty"></td>
                </tr>`
            } else {
                htmltmp += `
                <tr>
                    <td class="task_list_column"><input type="checkbox">${obj.title} </td>
                    <td class="empty"></td>
                    <td><span id="duesoon_number">${obj.counter}</span> duesoon</td>
                </tr>`
            }            
        }
        const taskListElement = document.querySelector('.' + view.domString.taskList);
        view.render(taskListElement, htmltmp)
    }

    const trackToggolBtn = () => {
        const toggleBtn = document.querySelector('#' + view.domString.toggle);

        const toggleHelper = arr => {
            let htmltmp = '';
            for (const obj of arr) {
                if (!obj.isOverdue) {
                    htmltmp += `
                    <tr>
                        <td class="task_list_column">${obj.title} </td>
                        <td class="empty"></td>
                        <td><span id="duesoon_number">${obj.counter}</span> duesoon</td>
                    </tr>`
                }            
            }
            const taskListElement = document.querySelector('.' + view.domString.taskList);
            view.render(taskListElement, htmltmp)
        }

        toggleBtn.addEventListener("click", toggleHelper(taskArry));
    }


    const init = () => {
        taskCounter(taskArry);
        showTask(taskArry);
        // trackToggolBtn();
    }

    return {
        init
    }

})(View, Model);

Controler.init();