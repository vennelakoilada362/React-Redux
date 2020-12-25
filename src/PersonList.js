import React, { Component } from "react";
import "./App.css";
import { Button, Modal } from "react-bootstrap";

export class PersonList extends Component {
  state = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    personlist: [],
    currentId: -1,
    show: false,
  };

  submit = (e) => {
    e.preventDefault();
    const newPerson = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      gender: this.state.gender,
    };

    if (this.state.currentId == -1) {
      this.setState({ personlist: [...this.state.personlist, newPerson] });
      this.setState({ firstName: "", lastName: "", age: "", gender: "" });
    } else {
      this.setState({
        personlist: this.state.personlist.map((person, i) => {
          if (i == this.state.currentId) {
            return newPerson;
          } else {
            return person;
          }
        }),
      });
      this.setState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        currentId: -1,
      });
    }
  };

  firstname = (e) => {
    this.setState({ firstName: e.target.value });
  };

  lastname = (e) => {
    this.setState({ lastName: e.target.value });
  };
  age = (e) => {
    this.setState({ age: e.target.value });
  };

  gender = (e) => {
    this.setState({ gender: e.target.id });
  };

  delete = (e) => {
    this.setState({
      personlist: this.state.personlist.filter((person, i) => i != e.target.id),
    });
  };

  edit = (e) => {
    this.setState({
      currentId: e.target.id,
      firstName: this.state.personlist[e.target.value].firstName,
      lastName: this.state.personlist[e.target.value].lastName,
      age: this.state.personlist[e.target.value].age,
      gender: this.state.personlist[e.target.value].gender,
    });
  };

  show = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div className="wrapper">
        <Button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          onClick={this.show}
        >
          Add Details
        </Button>
        <Modal show={this.state.show}>
          <Modal.Header closeButton onClick={this.show}>
            <h2>Form Page</h2>
          </Modal.Header>
          <Modal.Body>
            <form className="form-wrapper" onSubmit={this.submit}>
              <div className="firstName">
                <label>First Name</label>
                <input
                  type="text"
                  id="firstname"
                  placeholder="firstname"
                  onChange={this.firstname}
                  value={this.state.firstName}
                />
              </div>
              <div className="lastName">
                <label>Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  placeholder="lastname"
                  onChange={this.lastname}
                  value={this.state.lastName}
                />
              </div>
              <div className="age">
                <label>Age</label>
                <input
                  type="number"
                  id="age"
                  placeholder="age"
                  onChange={this.age}
                  value={this.state.age}
                />
              </div>
              <div className="gender">
                <label>Gender:</label>
                <br />
                <input
                  type="radio"
                  value={this.state.gender}
                  id="female"
                  name="gender"
                  checked={this.state.gender === "female"}
                  onChange={this.gender}
                />
                <label>Female</label>
                <input
                  type="radio"
                  value={this.state.gender}
                  id="male"
                  name="gender"
                  checked={this.state.gender === "male"}
                  onChange={this.gender}
                />
                <label>Male</label>
              </div>
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-danger" onClick={this.show}>
              Close
            </Button>
            <Button onClick={this.submit}>Save</Button>
          </Modal.Footer>
        </Modal>
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="personlist">
            {this.state.personlist.map((person, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.age}</td>
                <td>{person.gender}</td>
                <td>
                  <button
                    className="btn-primary"
                    id={i}
                    value={i}
                    onClick={this.edit}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn-danger" id={i} onClick={this.delete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PersonList;
