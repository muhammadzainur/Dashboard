import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { TreeService } from '../../service/component/tree.service';
import { TreeTableModule } from 'primeng/treetable';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-tree',
  imports: [TreeModule, TreeTableModule, CommonModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
})
export class TreeComponent {
  tree!: TreeNode[];
  treeTable!: TreeNode[];
  selectionKeys: { [key: string]: any } = {};

  cols!: Column[];
  selectedFiles!: TreeNode[];
  constructor(private treeService: TreeService) {}

  ngOnInit() {
    this.treeService.getFiles().then((data) => (this.tree = data));

    this.treeService
      .getTreeTableNodes()
      .then((files) => (this.treeTable = files));

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
    ];

    this.selectionKeys = {
      '0': {
        partialChecked: true,
      },
      '0-0': {
        partialChecked: false,
        checked: true,
      },
      '0-0-0': {
        checked: true,
      },
      '0-0-1': {
        checked: true,
      },
      '0-0-2': {
        checked: true,
      },
    };
  }
}
