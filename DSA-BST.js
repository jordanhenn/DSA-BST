class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        if (this.key == key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

function main() {
    const BST = new BinarySearchTree;
    BST.insert(3);
    BST.insert(1);
    BST.insert(4);
    BST.insert(6);
    BST.insert(9);
    BST.insert(2);
    BST.insert(5);
    BST.insert(7);
    console.log(BST);
    const QBST = new BinarySearchTree;
    QBST.insert('E');
    QBST.insert('A');
    QBST.insert('S');
    QBST.insert('Y');
    QBST.insert('Q');
    QBST.insert('U');
    QBST.insert('E');
    QBST.insert('S');
    QBST.insert('T');
    QBST.insert('I');
    QBST.insert('O');
    QBST.insert('N');
    console.log(QBST);
    console.log(thirdLargestNode(BST));
}

main();

//4, What does this program do?
// function tree(t){
//     if(!t){
//         return 0;
//     }
//     return tree(t.left) + t.value + tree(t.right)
// }
//It looks like this algorithm runs through an entire tree starting
//from the root and adds up all the keys of the tree together.
//Best case runtime is O(1) -- if the root is the only value
//Average case is O(n) as the function has to go through every item of the tree

//5. Height of a BST - not working
function BSTHeight(tree) {
    let rightHeight = 0;
    let leftHeight = 0;
    while (tree.left || tree.right) {
    if (tree.left) {
        leftHeight++
        BSTHeight(tree.left)
    }
    if (tree.right) {
        rightHeight++
        BSTHeight(tree.right)
    }
    }
    if(rightHeight > leftHeight) {
        return rightHeight
    } else {
        return leftHeight
    }
}

//6. Is it a BST?
function BSTCheck(tree) {
    if (tree.left) {
        if (tree.left.key < tree.key) {
            BSTCheck(tree.left)
        }
        else {
            return false
        }
    }
    if (tree.right) {
        if (tree.right.key > tree.key) {
            BSTCheck(tree.right)
        } else {
            return false
        }
    }
    return true
}

//7. Third Largest Node -- returning undefined
function thirdLargestNode(tree) {
    let rightValues = []
    if (tree.right) {
        rightValues.push(tree.right.value)
        thirdLargestNode(tree.right)
    }
    return rightValues[rightValues.length - 3]
}

//8. Balanced BST
function balancedBST(tree) {

}

//9. same BSTs
function checkSameBST(tree) {
    
}