import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Image, List, ListItem, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';
 
export function Products (props) {
  const [info, setInfo] = useState([])

  useEffect(()=>{
    getInfo()
  }, []);

  const getInfo = async () => {
    try {
      let res = await axios.get('/api/products')
      setInfo(normalizeInfo(res.data))
    } catch (error) {
      alert("error getting product")
    }
  }

  const normalizeInfo = (data) => {
    console.log(data)
    let ids = data.map((s) => s.seller_id)
    let unique_seller = [...new Set(ids)]
    return unique_seller.map((id) => {
      let products = data.filter((p) => p.seller_id === id)
      let {sellers_name, email} = products[0]
      let sellersProducts = products.map((p)=> {
        return {
          name: p.name,
          price: p.price,
          description: p.description,
          category: p.category,
          productID: p.id
        };
      });
      return {sellers_name, email, products: sellersProducts}
    });
  }

  const renderProducts = (products) => {
    return products.map((p) => {
      return (
        <Table.Row>
          <Table.Cell>${p.price}</Table.Cell>
          <Table.Cell>{p.name}</Table.Cell>
          <Table.Cell>{p.description}</Table.Cell>
          <Table.Cell>{p.category}</Table.Cell>
        </Table.Row>
      );
    });
  };

  const renderList = () => {
    return info.map((s) => {
      return (
        <List.Item style={{padding: "15px"}}>
          <Image
            avatar
            src="https://semantic-ui.com/images/avatar2/small/lindsay.png"
          /> 
          <List.Header>
            {s.sellers_name}
          </List.Header>
          <List.Content>
              <List.Content>{s.name}</List.Content>
          </List.Content>
          <List.Content>
            <Table celled style={{ marginTop: "10px" }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Character</Table.HeaderCell>
                  <Table.HeaderCell>Quote</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{renderProducts(s.products)}</Table.Body>
            </Table>
          </List.Content>
        </List.Item>
      );
    });
  };

  return (
    <div>
      <Header>LOTR Quotes</Header>
      <HeaderSubHeader>Crafts</HeaderSubHeader>
      <List
      divided
      verticalAlign="middle"
      style={{border: "1px solid", padding: "20px" }}
      >
        {renderList()}
      </List>
    </div>
  );
};
