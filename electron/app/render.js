import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import wrapListeners from './listen';
import Debug from 'debug';
import Gab from './common/gab';
import Any from './pages/component/any';
import electron from './common/electron';

import {
  TitleBar,
  Button,
  TextBox,
  TextBlock,
  ProgressRing,
  Form,
  Window,
  Checkbox,
  SplitView,
  View,
  ListView
} from 'react-desktop/lib/Windows';

import * as Icons from './assets/icons';

let debug = Debug('snowstreams:app:render');
let win = electron.remote.getCurrentWindow();
let Sonarr = <iframe  width="99%" height="99%" src="http://snowbot:8001/calendar" /> ;
let Sab = <iframe width="99%" height="99%" src="http://snowbot:8000" /> ;



export class Blank extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div/>
    );
  }
}

class Window2 extends Component {
   constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      bgcolor: props.bgcolor || '#eee',
      titleTheme: 'dark',
      width: '100%', 
      height: '99%',
      theme: 'light'
    };
  }

  render() {
    debug('sonarr',Sonarr, Sab);
    return (
      <Window
        ref="window"
        color={this.state.color}
        chrome
        requestedTheme={this.state.theme || 'dark'}
        storage={localStorage}
        style={{width: this.state.width, height: this.state.height }}
      >
        <TitleBar title="SNOWSTREAMS" 
			requestedTheme={this.state.titleTheme || this.state.theme || 'dark'}
            background="#000"
			controls 
			onClosePress={() => { 
				if(confirm('Do you want to exit?')) {
					win.close();
				}
			}}
			onResizePress={() => { alert('resize'); }}
			onMinimizePress={() => { 
				win.minimize();
				
			}}
			onMaximizePress={() => { 
				win.maximize();
			}}
		/>

        <SplitView isOpen openLength={200} push persistIsOpen persistSelectedItem>
		<SplitView.Item
			title="Channels"
			icon={Icons.progress}
			padding="2px"
			requestedTheme={this.state.theme || 'dark'}
			background="#000"
		>		
			Channels

		</SplitView.Item>
		
		<SplitView.Item
			title="Advanced"
			icon={Icons.home}
			requestedTheme={this.state.theme || 'dark'}
			background={this.state.bgcolor || '#000'}
		>
			<iframe src="http://snowwhite:11000/client" width="99%" height="99%" />
		</SplitView.Item>
		
		<SplitView.Item
			title="Sonarr"
			icon={Icons.progress}
			padding="2px"
			requestedTheme={this.state.theme || 'dark'}
			background="#000"
		>		
			{Sonarr}

		</SplitView.Item>
		
		<SplitView.Item
			title="Sab+"
			icon={Icons.progress}
			padding="2px"
			requestedTheme={this.state.theme || 'dark'}
			background="#000"
		>
			
			{Sab}
			

		</SplitView.Item>
          <SplitView.Item
            title="Forms"
            icon={Icons.form}
            padding="40px 30px"
            requestedTheme={this.state.theme || 'dark'}
            background={this.state.bgcolor || '#fff'}
          >
            <Form>
              <TextBlock color="red">
                There was an error submitting this form.
              </TextBlock>

              <Form.Row>
                <TextBox header="Label" defaultValue="" placeholder="TextField" style={{width: '400px'}}/>
              </Form.Row>

              <Form.Row>
                <TextBox header="Longer Label" defaultValue="" placeholder="TextField" style={{width: '400px'}}/>
              </Form.Row>

              <Form.Row>
                <Checkbox label="Default checked" defaultChecked/>
              </Form.Row>

              <Form.Row>
                <Button onPress="submit" color push>Button With Color</Button>
                <Button push>Button</Button>
              </Form.Row>
            </Form>
          </SplitView.Item>
        <SplitView.Item
			title="Progress"
			icon={Icons.progress}
			padding="40px 30px"
			requestedTheme="light"
			background={this.state.bgcolor || '#fff'}
			style={{
				backgroundImage: 'url(giphy.gif)',
				backgroundSize: 'cover',
				backgroundPosition: 'bottom center'
			}}
        >
            <View horizontalAlignment="center" verticalAlignment="center">
              <ProgressRing size={60} color/>
            </View>
          </SplitView.Item>
          <SplitView.Item
            title="List View"
            icon={Icons.listView}
            requestedTheme={this.state.theme || 'dark'}
            background={this.state.bgcolor || '#fff'}
          >
            <ListView detailsWidth="200">
              <ListView.Item>
                <ListView.Item.Master>
                  Erv
                </ListView.Item.Master>
                {this.renderDetails('Hi')}
              </ListView.Item>
              <ListView.Item>
                <ListView.Item.Master>
                  Hello2
                </ListView.Item.Master>
                {this.renderDetails('Hello')}
              </ListView.Item>
            </ListView>
          </SplitView.Item>
        </SplitView>
      </Window>
    );
  }

  renderDetails(text) {
    return (
      <ListView.Item.Details background>
        <View padding="20px 30px">
          <TextBlock color="white">{text}</TextBlock>
        </View>
      </ListView.Item.Details>
    );
  }
}
export default wrapListeners(Window2) 
