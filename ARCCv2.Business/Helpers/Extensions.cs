using System.Collections.Generic;

namespace ARCCv2.Business.Helpers
{
    // helper class for customized extensions - tina
    public static class Extensions
    {
        public static HashSet<T> ToHashSet<T>(this IEnumerable<T> source)
        {
            return new HashSet<T>(source);
        }
    }
}
