import * as React from 'react';
import styles from './SpaceEraser.module.scss';
import { ISpaceEraserProps } from './ISpaceEraserProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DisplayMode } from '@microsoft/sp-core-library';

export default class SpaceEraser extends React.Component<ISpaceEraserProps, {}> {
  private ref: React.RefObject<HTMLDivElement>;

  public componentDidMount() {
    let searching = true;
    
    // Find the parent ControlZone div of the Space Eraser webpart and set its class.
    let parentDiv = this.ref.current.closest('.ControlZone');
    if(this.props.displayMode === DisplayMode.Read)
      parentDiv.classList.add(styles.spaceEraser, styles.read);

    // Find the previous sibling of our parent ControlZone
    let previousDiv = parentDiv.previousElementSibling;

    // May need to walk up a few siblings to find the nearest Control Zone
    while (previousDiv && searching) {
      if (previousDiv.classList.contains('ControlZone')) {
        searching = false;

        previousDiv.classList.add(styles.previous);

        if(this.props.removeMargins)
          previousDiv.classList.add(styles.prevMargin);
        else
          previousDiv.classList.remove(styles.prevMargin);

        if(this.props.removePadding)
          previousDiv.classList.add(styles.prevPadding);
        else
          previousDiv.classList.remove(styles.prevPadding);
      }
      else {
        previousDiv.setAttribute("hidden", "true");
        previousDiv = previousDiv.previousElementSibling;
      }
    }
    searching = true;

    // Find the next sibling after our parent ControlZone
    let nextDiv = parentDiv.nextElementSibling;

    // Walk down until we find a ControlZone
    while (nextDiv && searching) {
      if (nextDiv.classList.contains('ControlZone')) {
        searching = false;

        nextDiv.classList.add(styles.next);

        if(this.props.removeMargins)
          nextDiv.classList.add(styles.nextMargin);
        else
          nextDiv.classList.remove(styles.nextMargin);

        if(this.props.removePadding)
          nextDiv.classList.add(styles.nextPadding);
        else
          nextDiv.classList.remove(styles.nextPadding);        
      }
      else {
        nextDiv.setAttribute("hidden", "true");
        nextDiv = nextDiv.nextElementSibling;
      }
    }
  }

  public render(): React.ReactElement<ISpaceEraserProps> {
    this.ref = React.createRef();
    
    return (
      <div ref={this.ref} className={styles.spaceEraser}>
        { this.props.displayMode === DisplayMode.Edit && (
            <p>SPACE ERASER - This space belongs to you!</p>
          )
        }
      </div>
    );
  }
}
