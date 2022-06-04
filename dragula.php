<div class="panel-heading">
    <h2>Kanban Board</h2>
</div>
<div class="panel-body px-2">
    <main class="content">
        <div class="row" id="status-draggable">
            
            <div on-finish-render="ngRepeatFinished" class="col-md-3 kanban-status" data-id="{{status.id}}" ng-repeat="status in statuses">
                <div class="card card-border-primary">
                    <div class="card-header" style="background-color: {{status.color}}">
                        <h5 class="card-title">{{status.name}}</h5>
                    </div>
                    <div class="card-body p-3 draggable kanban-scroll kanban-container" data-id="{{status.id}}">
                        <div class="card mb-3 bg-light kanban-todo" id="{{task.id}}" ng-repeat="task in individual_tasks_kanban[statusesMap[status.slug]]">
                            <div class="card-actions float-right">
                                <div class="dropdown show">
                                    <a href="#" data-toggle="dropdown" data-display="static">
                                        <svg class="float-right pl-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal align-middle">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </a>

                                    <div class="dropdown-menu dropdown-menu-kanban dropdown-menu-right">
                                        <a href="#editTask"			  class="dropdown-item" ng-if="task.editabled"  ng-click="editIndividualTask(task)" data-toggle="modal" title="Change"><i class="fa fa-pencil-square-o"></i> Edit</a>
                                        <a href="javascript:void(0);" class="dropdown-item"  ng-if="task.deletable" ng-click="remove(task)" title="Delete"><i class="fa fa-trash-o"></i> Delete</a>
                                        <a href="javascript:void(0);" class="dropdown-item"  ng-if="task.convertable" ng-click="convertToTimesheet(task)" title="Create Timesheet"><i class="fa fa-clock-o" aria-hidden="true"></i> Timesheet</a>
                                        <a href="javascript:void(0);" class="dropdown-item"  ng-click="markComplete(task)" title="Complete"><i class="fa fa-check-circle"></i> Complete</a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body p-3">
                                <p>{{ task.name || 'Unknown'}}</p>
                                <a class="btn-kanban btn-base btn-sm float-right" data-toggle="modal" ng-click="preview(task)" href="#quickView" data-id="{{ task.id }}">View</a>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>


        </div>
    </main>
</div>
