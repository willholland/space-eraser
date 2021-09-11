import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpaceEraserWebPartStrings';
import SpaceEraser from './components/SpaceEraser';
import { ISpaceEraserProps } from './components/ISpaceEraserProps';

export interface ISpaceEraserWebPartProps {
  removeMargins: Boolean;
  removePadding: Boolean;
}

export default class SpaceEraserWebPart extends BaseClientSideWebPart<ISpaceEraserWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpaceEraserProps> = React.createElement(
      SpaceEraser,
      {
        displayMode: this.displayMode,
        removeMargins: this.properties.removeMargins,
        removePadding: this.properties.removePadding
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {    
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('removeMargins', {
                  label: strings.RemoveMarginsFieldLabel
                }),
                PropertyPaneToggle('removePadding', {
                  label: strings.RemovePaddingFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
