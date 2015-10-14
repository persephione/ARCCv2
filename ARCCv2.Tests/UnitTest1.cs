using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ARCCv2.Business.Managers;

namespace ARCCv2.Tests
{
    [TestClass]
    public class UnitTest1
    {
        ARCCManager arccManager;

        [TestInitialize]
        public void Initialize()
        {
            arccManager = new ARCCManager();
        }

        [TestMethod]
        public void TestMethod1()
        {
            var test = arccManager.GetARCCProposals();
            Assert.Equals(test.Count, 0);
        }
    }
}
