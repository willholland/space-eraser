import * as React from 'react';
import styles from './SpaceEraser.module.scss';
import { ISpaceEraserProps } from './ISpaceEraserProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpaceEraser extends React.Component<ISpaceEraserProps, {}> {
  private ref:React.RefObject<HTMLDivElement>; 

  public componentDidMount() {
    let parentDiv = this.ref.current.parentElement.parentElement.parentElement.parentElement;    
    parentDiv.setAttribute("class", styles.spaceEraser)
    
    let previousDiv = parentDiv.previousElementSibling;
    if(previousDiv){
      let perviousStyles = previousDiv.getAttribute("styles");
      previousDiv.setAttribute("styles", perviousStyles + "margin-bottom: 0;")
    }

    let nextDiv = parentDiv.nextElementSibling;
    if(nextDiv){
      let nextStyles = nextDiv.getAttribute("styles");
      nextDiv.setAttribute("styles", nextStyles + "margin-bottom: 0;")
    }
    // .setAttribute("style", "margin-bottom:0;");
    // .getAttribute("style").setAttribute("style", "margin-top:0;")
  }
  public render(): React.ReactElement<ISpaceEraserProps> {
    this.ref = React.createRef();
    
    return (
      <div ref={this.ref} className={ styles.spaceEraser }>      
      </div>
    );
  }
}
