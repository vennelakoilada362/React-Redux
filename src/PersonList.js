import React, { Component } from "react";
import "./App.css";
import { Button, Modal } from "react-bootstrap";
import {
  BsFillPersonPlusFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";

export class PersonList extends Component {
  state = {
    i: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    search: "",
    personlist: [
      {
        firstName: "Cullen",
        lastName: "Renesmee",
        age: "10",
        gender: "Female",
      },
      {
        firstName: "Koilada",
        lastName: "Vennela",
        age: "19",
        gender: "Female",
      },
      {
        firstName: "Prince",
        lastName: "Loki",
        age: "28",
        gender: "Male",
      },
      {
        firstName: "Tony",
        lastName: "Stark",
        age: "29",
        gender: "Male",
      },
    ],
    currentId: -1,
    show: false,
    error: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
  };

  validate = () => {
    this.setState({
      error: {
        firstName: this.state.firstName == "",
        lastName: this.state.lastName == "",
        age: this.state.age == "",
        gender: this.state.gender == "",
      },
    });
    return (
      this.state.firstName != "" &&
      this.state.lastName != "" &&
      this.state.age != "" &&
      this.state.gender != ""
    );
  };

  submit = (e) => {
    e.preventDefault();
    const newPerson = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      gender: this.state.gender,
    };

    if (this.validate()) {
      if (this.state.currentId == -1) {
        this.setState({ personlist: [...this.state.personlist, newPerson] });
        this.setState({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
        });
        this.setState({ show: !this.state.show });
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
          show: !this.state.show,
        });
      }
    }
  };

  firstname = (e) => {
    this.setState({
      firstName: e.target.value,
      error: { ...this.state.error, firstName: false },
    });
  };

  lastname = (e) => {
    this.setState({
      lastName: e.target.value,
      error: { ...this.state.error, lastName: false },
    });
  };
  age = (e) => {
    this.setState({
      age: e.target.value,
      error: { ...this.state.error, age: false },
    });
  };

  gender = (e) => {
    this.setState({
      gender: e.target.id,
      error: { ...this.state.error, gender: false },
    });
  };

  delete = (e) => {
    this.setState({
      personlist: this.state.personlist.filter((person, i) => i != e.target.id),
    });
  };

  edit = (e) => {
    this.setState({ show: !this.state.show });
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

  cancel = () => {
    this.setState({ show: !this.state.show });
    this.setState({
      currentId: -1,
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      error: {
        currentId: -1,
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
      },
    });
  };

  search = (e) => {
    this.setState({ search: e.target.value });
    {
      this.state.personlist.filter((person) => {
        return (
          person.firstName
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
          person.lastName
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
          person.age.toLowerCase().includes(this.state.search.toLowerCase()) ||
          person.gender.toLowerCase().includes(this.state.search.toLowerCase())
        );
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <h1 className="h1">
          <AiOutlineTeam />
          PersonList
        </h1>
        <br />
        <Button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          onClick={this.show}
        >
          <BsFillPersonPlusFill />
          Add Details
        </Button>
        <Modal show={this.state.show}>
          <Modal.Header closeButton onClick={this.cancel}>
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
                <p className="error">
                  {this.state.error.firstName ? "*Can't be blank" : ""}
                </p>
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
                <p className="error">
                  {this.state.error.lastName ? "*Can't be blank" : ""}
                </p>
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
                <p className="error">
                  {this.state.error.age ? "*Can't be blank" : ""}
                </p>
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
                <p className="error">
                  {this.state.error.gender ? "*Can't be blank" : ""}
                </p>
              </div>
              {/* <div>
                <Button type="submit">Submit</Button>
              </div> */}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={this.cancel}>
              Cancel
            </Button>
            <Button className="btn btn-primary" onClick={this.submit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
        <input
          type="text"
          name="search"
          id="input"
          placeholder="Search User...."
          value={this.state.search}
          onChange={this.search}
        />
        <br />
        <table className="table table-striped container">
          <thead>
            <tr>
              <th>S.No</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="personlist">
            {this.state.personlist
              .filter((person) => {
                if (this.state.search == "") {
                  return person;
                } else if (
                  person.firstName
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) ||
                  person.lastName
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) ||
                  person.age
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) ||
                  person.gender
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
                ) {
                  return person;
                }
              })
              .map((person, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.age}</td>
                  <td>{person.gender}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      id={i}
                      value={i}
                      onClick={this.edit}
                    >
                      <BsPencilSquare />
                      Edit
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-danger" id={i} onClick={this.delete}>
                      <BsFillTrashFill /> Delete
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
