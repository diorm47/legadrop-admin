import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { mainApi } from "../../components/utils/main-api";
import "./employees.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const getEmployees = () => {
    mainApi
      .getEmployeesAction()
      .then((res) => {
        setEmployees(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const handleEmployeeDelete = (admin_id) => {
    mainApi
      .deleteEmployeeAction({ admin_id: admin_id })
      .then((res) => {
        getEmployees();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  console.log(employees);

  return (
    <div className="template_page employees_page">
      <div className="template_page_title">
        <h1>Сотрудники</h1>
        <div className="users_search">
          <SearchIcon />
          <input type="text" placeholder="Поиск" />
        </div>
      </div>
      <div className="template_page_content">
        <div className="user_line"></div>
        <div className="employees_wrapper">
          <div className="employe_search_add">
            <div className="employe_search">
              <input
                type="text"
                placeholder="Логин, должность, электронная почта"
              />
              <SearchIcon />
            </div>
            <NavLink to="/add-employee">
              <div className="employe_add">
                <span>+</span> <p>Добавить пользователя</p>
              </div>
            </NavLink>
          </div>
          {employees && employees[0] ? (
            <table className="employes_table">
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Логин</th>
                  <th>РОЛЬ</th>
                  <th>электронная почта</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employees && employees[0] ? (
                  employees.map((employee) => (
                    <tr key={employee.employee.id}>
                      <td>{employee.employee.first_name}</td>
                      <td>{employee.employee.username}</td>
                      <td>
                        {(employee.role &&
                          employee.role[0] &&
                          employee.role[0].name &&
                          employee.role[0].name) ||
                          ""}
                      </td>
                      <td>{employee.employee.email}</td>
                      <td className="employer_list_actions">
                        <div className="employer_action_btns">
                          <EditIcon title="Редактировать" />
                          <DeleteIcon
                            title="Удалить"
                            onClick={() =>
                              handleEmployeeDelete(employee.employee.admin_id)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          ) : (
            <p className="empty_error">Сотрудники отсутствуют</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employees;
