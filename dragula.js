// Global Vars
var all_events;
var multiComments = [];
var current_user = [];

var app = angular.module('myApp', ["ngProgress","datatables"]).directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
}).run(initDT);

function initDT(DTDefaultOptions, DTOptionsBuilder) {
    DTDefaultOptions.setLanguage({
            "lengthMenu": "_MENU_"
        });
	DTDefaultOptions.setDisplayLength(10);
	DTDefaultOptions.setDOM('<"panel-ctrls"<"col-sm-6"l><"col-sm-6"<"pull-right m-n"f>>><t><"panel-footer"<"col-sm-6"i><"col-sm-6"<"pull-right m-n"p>>>');
}



app.controller('individualtasksCtrl', function($scope, $rootScope ,$http, ngProgressFactory, DTOptionsBuilder, $timeout) {

	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		// Drag 'n Drop Todos
		const dragObj = ($scope.current_user.group_admin)
			? draggable([...Array.from(document.getElementsByClassName('draggable')), document.getElementById("status-draggable")])
			: dragObj = draggable(Array.from(document.getElementsByClassName('draggable')))
			
		presistDrag(dragObj)
	});

});

// Drag 'n Drop
function draggable(bags, presist) {
	return dragula(bags, {
		accepts: function (el, target, source, sibling) {
			// Kanban Status Containers Works Separate From Kanban Todos Items
			if (
				(el.classList.contains("kanban-todo") && !target.classList.contains("kanban-container")) ||
				(el.classList.contains("kanban-status") && target.classList.contains("kanban-container"))
			)
				return false;
			return true;
		},
	})
}

function presistDrag(dragula) {
	var source = '';
	dragula.on('drag', function(el) {
		source = el.parentNode
	})
	.on('dragend', function(el) {
		const target = el.parentNode

		// Presist Drag Drop
		if (el.classList.contains('kanban-todo')) presistTodosDrag(el, source, target)
		if (el.classList.contains('kanban-status')) presistStatusDrag()
	});
}

// Drag Status Containers
function presistStatusDrag() {
	let statusesEl = $(".kanban-status");
	if (statusesEl) {

		let statuses = [];
		for (let i=1; i<=statusesEl.length; i++)
			statuses.push({sort: i, id: statusesEl[i-1].getAttribute('data-id')})

		// Presist Status Order
		$.ajax({
			type: "POST",
			url: `/individual_tasks/ajax/draggable`,
			data: { mode: "status", statuses: statuses },
			success: (response) => {
				const data = JSON.parse(response)
				if (data.success) {
					//
				} else {
					//
				}
			},
			error: (xhr, status, error) => {
				console.log(xhr.responseJSON.errors)
			}
		})
	}
}

// Drag Todos Items
function presistTodosDrag(todo, source, target) {
	const taskId = todo.id;
	const statusId = source.getAttribute('data-id')
	const newStatusId = target.getAttribute('data-id');

	// Presist Only if Todo Is Dragged to another Kanban Container (Status)
	if (statusId != newStatusId) {
		$.ajax({
			type: "POST",
			url: `/individual_tasks/ajax/draggable`,
			data: { mode: "todo", taskId: taskId, statusId: newStatusId },
			success: (response) => {
				const data = JSON.parse(response) 
				if (data.success) {
					//
				} else {
					//
				}
			},
			error: (xhr, status, error) => {
				console.log(xhr.responseJSON.errors)
			}
		})
	}
}

function isEmptyArr(arr) {
	return (Array.isArray(arr) && arr.length) ? false : true;
}

function isEmpty(obj) {
	for(var prop in obj)
		if(obj.hasOwnProperty(prop))
			return false;
	return JSON.stringify(obj) === JSON.stringify({});
}