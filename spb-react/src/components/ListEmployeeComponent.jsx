import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { withRouter } from 'react-router-dom';


class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees: []
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployess().then((res) => {
            this.setState({employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push("/add-employee");
        document.location.reload();
    }

    editEmployee(id){
        this.props.history.push(`/update-employee/${id}`);
        document.location.reload();
    }

    deleteEmployee(employeeId){
        EmployeeService.deleteEmployee(employeeId).then(res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== employeeId)});
        });
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
        document.location.reload();
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className='row'>
                    <button className='bt btn-primary' onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                     <tr key= {employee.id} >
                                        <td> {employee.firstName}</td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.emailId}</td>
                                        <td>
                                        <button onClick={() => this.editEmployee(employee.id)} className='btn btn-info'>Update</button>
                                        <button style={{marginLeft: "10px"}} onClick={() => this.deleteEmployee(employee.id)} className='btn btn-danger'>Delete</button>
                                        <button style={{marginLeft: "10px"}} onClick={() => this.viewEmployee(employee.id)} className='btn btn-success'>View</button>
                                        </td>
                                     </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter (ListEmployeeComponent);