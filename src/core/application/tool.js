const makeGenericTool = function () {
  return {
    isBeingUsed: false,
    onToolBegin: function () { },
    onToolEnd: function () { },
    toolCallback: function () { }
  }
}

export {
  makeGenericTool
}