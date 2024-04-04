import { Component, OnInit } from '@angular/core';
import { GridModule, GridDataResult } from '@progress/kendo-angular-grid';
import { PositionModel } from '../../../shared/model';
import { Position } from '../../../shared/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capacity',
  standalone: true,
  imports: [CommonModule, GridModule],
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss'],
})
export class CapacityComponent implements OnInit {
  public gridView: GridDataResult | null = null;
  private items: PositionModel[] = Position;
  public pageSize = 5;
  public skip = 0;

  PositionNameArray: { id: string; name: string }[] = [];
  public CompetenceNameArray: string[] = [];
  // public PositionNameArray: { name: string; data: any[]; }[] = [];
  public PositionsArray: PositionModel[][] = [];
  public competencebyPosition: {
    PositionID: string;
    competences: PositionModel[];
  }[] = [];

  ngOnInit(): void {
    // console.log('position', this.getPositionNames());
    this.getPositionNames();
    console.log('PotisionName array:', this.CompetenceNameArray);
    this.groupCompetencesByPosition();
    this.getCompetences();

    this.loadItems();
    console.log('data:', this.gridView);
  }

  public loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length,
    };
  }

  public getPositionNames(): void {
    const positionMap = new Map<string, { id: string; name: string }>();

    this.items.forEach((item) => {
      const key = item.PositionID + '-' + item.PositionName;
      if (!positionMap.has(key)) {
        positionMap.set(key, { id: item.PositionID, name: item.PositionName });
      }
    });

    this.PositionNameArray = Array.from(positionMap.values());
    console.log('PositionName', this.PositionNameArray);
  }

  // public getPositionNames(): void {
  //   const positionNamesSet = new Set<string>();
  //   const uniquePositions: { name: string; data: any[] }[] = []; // Array to store unique position names and corresponding data

  //   this.items.forEach((item) => {
  //     if (!positionNamesSet.has(item.PositionName)) {
  //       positionNamesSet.add(item.PositionName);
  //       uniquePositions.push({ name: item.PositionName, data: [item] }); // Store the item in an array under the position name
  //     } else {
  //       const existingPositionIndex = uniquePositions.findIndex(
  //         (position) => position.name === item.PositionName
  //       );
  //       uniquePositions[existingPositionIndex].data.push(item); // Push the item into the data array of the existing position
  //     }
  //   });

  //   this.PositionNameArray = uniquePositions;
  //   console.log('PositionName', this.PositionNameArray);
  // }
  public getCompetences(): string[] {
    const competenceNameSet = new Set<string>();
    this.items.forEach((item) => {
      competenceNameSet.add(item.CompetenceName);
    });
    this.CompetenceNameArray = Array.from(competenceNameSet);
    console.log('CompetenceNameArray:', this.CompetenceNameArray);
    return this.CompetenceNameArray;
  }

  // private groupCompetencesByPosition(): void {
  //   this.PositionsArray = this.items.reduce(
  //     (acc: any[], item: PositionModel) => {
  //       const positionId = item.PositionID;

  //       const existingPosition = acc.find(
  //         (position) => position.PositionID === positionId
  //       );

  //       if (existingPosition) {
  //         existingPosition.competences.push(item);
  //       } else {
  //         acc.push({
  //           PositionID: positionId,
  //           competences: [item],
  //         });
  //       }

  //       return acc;
  //     },
  //     []
  //   );
  //   console.log('competencebyPosition:', this.PositionsArray);
  //   this.loadItems();
  // }

  // Declare PositionsArray with the correct type

  private groupCompetencesByPosition(): void {
    this.PositionsArray = this.items.reduce(
      (acc: PositionModel[][], item: PositionModel) => {
        const positionName = item.PositionName;

        const existingPositionIndex = acc.findIndex((positions) =>
          positions.some((position) => position.PositionName === positionName)
        );

        if (existingPositionIndex !== -1) {
          acc[existingPositionIndex].push(item);
        } else {
          acc.push([item]);
        }

        return acc;
      },
      []
    );
    console.log('competencebyPosition:', this.PositionsArray);
    this.loadItems();
  }
}
