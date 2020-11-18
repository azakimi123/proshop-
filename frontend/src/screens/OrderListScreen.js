import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listOrders());
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo]);

  console.log(history)

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>CUSTOMER</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>SHIPPED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.user && order.user.name}</td>
                <td>${order.totalPrice}</td>
                <td style={{ textAlign: "center" }}>
                  {order.isPaid ? (
                    <i
                      className="far fa-check-square my-2"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i
                      className="far fa-times-circle my-2"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {order.isDelivered ? 
                  order.deliveredAt.substring(0, 10)
                  : (
                    <i
                      className="far fa-times-circle my-2"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <LinkContainer  to={`/admin/order/details/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-external-link-alt"></i>
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
